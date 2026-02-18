<?php
/**
 * Planeta X – LLM Chat API
 * Proxies requests to OpenRouter with context-aware preprompt
 *
 * POST /api/chat.php
 * Body: {
 *   "message": "user question",
 *   "context": {
 *     "missionId": "cyberquest",
 *     "missionTitle": "CyberQuest",
 *     "layerTitle": "Teczki tajne i ściśle tajne",
 *     "layerDescription": "Pliki mają poziomy tajności...",
 *     "layerAnalogy": "📁 Uprawnienia = poziomy tajności teczek...",
 *     "stepInstruction": "Sprawdź poziomy tajności swoich teczek:",
 *     "stepCommand": "ls -la ~/",
 *     "stepTip": "...",
 *     "categoryLabel": "🔏 Szyfry"
 *   },
 *   "history": [{"role":"user","content":"..."},{"role":"assistant","content":"..."}]
 * }
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ─── Load .env ───
function loadEnv(string $path): void {
    if (!file_exists($path)) return;
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        [$key, $val] = array_map('trim', explode('=', $line, 2));
        if (!isset($_ENV[$key]) && !getenv($key)) {
            putenv("$key=$val");
            $_ENV[$key] = $val;
        }
    }
}

loadEnv(__DIR__ . '/../.env');
loadEnv(__DIR__ . '/.env');

function env(string $key, string $default = ''): string {
    return $_ENV[$key] ?? getenv($key) ?: $default;
}

// ─── Config ───
$apiKey   = env('OPENROUTER_API_KEY');
$model    = env('OPENROUTER_MODEL', 'google/gemma-3-27b-it:free');
$siteUrl  = env('OPENROUTER_SITE_URL', 'https://planetax.prototypowy.pl');
$siteName = env('OPENROUTER_SITE_NAME', 'Planeta X Akademia');
$maxTok   = (int) env('LLM_MAX_TOKENS', '800');
$temp     = (float) env('LLM_TEMPERATURE', '0.7');

if (empty($apiKey) || str_starts_with($apiKey, 'sk-or-v1-xxx')) {
    http_response_code(503);
    echo json_encode(['error' => 'OpenRouter API key not configured. Set OPENROUTER_API_KEY in .env']);
    exit;
}

// ─── Parse request ───
$body = json_decode(file_get_contents('php://input'), true);
if (!$body || empty($body['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'message is required']);
    exit;
}

$userMessage = trim($body['message']);
$ctx         = $body['context'] ?? [];
$history     = $body['history'] ?? [];

// ─── Build system preprompt ───
$missionId    = $ctx['missionId']        ?? 'unknown';
$missionTitle = $ctx['missionTitle']     ?? 'Planeta X';
$layerTitle   = $ctx['layerTitle']       ?? '';
$layerDesc    = $ctx['layerDescription'] ?? '';
$layerAnalogy = $ctx['layerAnalogy']     ?? '';
$stepInstr    = $ctx['stepInstruction']  ?? '';
$stepCmd      = $ctx['stepCommand']      ?? '';
$stepTip      = $ctx['stepTip']          ?? '';
$category     = $ctx['categoryLabel']    ?? '';

$systemPrompt = <<<PROMPT
Jesteś pomocnym asystentem edukacyjnym dla dzieci i młodzieży w wieku 10-15 lat w aplikacji "Planeta X – Akademia Młodego Odkrywcy".

## Twoja rola
Pomagasz uczniowi zrozumieć koncepcje informatyczne i Linuxa w prosty, przyjazny sposób. Używasz analogii ze świata codziennego (samochody, miasto, zamek, sklep, plecak itp.). Odpowiadasz po polsku, chyba że uczeń pisze w innym języku.

## Aktualny kontekst lekcji
- **Misja:** $missionTitle (ID: $missionId)
- **Kategoria:** $category
- **Etap:** $layerTitle
- **Opis etapu:** $layerDesc
- **Analogia:** $layerAnalogy
- **Aktualne zadanie:** $stepInstr
- **Komenda do wpisania:** `$stepCmd`
- **Wskazówka:** $stepTip

## Zasady odpowiedzi
1. Odpowiadaj TYLKO w kontekście tej lekcji i tego zadania. Jeśli pytanie jest niezwiązane, delikatnie skieruj z powrotem do tematu.
2. Używaj prostego języka dla 10-15 latka. Unikaj żargonu bez wyjaśnienia.
3. Jeśli uczeń pyta o komendę – wyjaśnij co ona robi, używając analogii z lekcji.
4. Jeśli uczeń jest zagubiony – podaj wskazówkę krok po kroku, ale nie podawaj od razu gotowej odpowiedzi.
5. Bądź zachęcający i pozytywny. Używaj emoji sparingly.
6. Odpowiedź max 3-4 zdania, chyba że pytanie wymaga dłuższego wyjaśnienia.
7. Jeśli pytanie dotyczy komendy `$stepCmd` – wyjaśnij ją dokładnie w kontekście analogii z lekcji.
PROMPT;

// ─── Build messages array ───
$messages = [['role' => 'system', 'content' => $systemPrompt]];

// Add conversation history (max last 6 exchanges = 12 messages)
$historySlice = array_slice($history, -12);
foreach ($historySlice as $msg) {
    if (isset($msg['role'], $msg['content']) && in_array($msg['role'], ['user', 'assistant'])) {
        $messages[] = ['role' => $msg['role'], 'content' => (string)$msg['content']];
    }
}

$messages[] = ['role' => 'user', 'content' => $userMessage];

// ─── Call OpenRouter ───
$payload = json_encode([
    'model'       => $model,
    'messages'    => $messages,
    'max_tokens'  => $maxTok,
    'temperature' => $temp,
]);

$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
        'HTTP-Referer: ' . $siteUrl,
        'X-Title: ' . $siteName,
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    http_response_code(502);
    echo json_encode(['error' => 'Connection error: ' . $curlErr]);
    exit;
}

$data = json_decode($response, true);

if ($httpCode !== 200 || empty($data['choices'][0]['message']['content'])) {
    $errMsg = $data['error']['message'] ?? $data['message'] ?? 'Unknown error from OpenRouter';
    http_response_code($httpCode ?: 502);
    echo json_encode(['error' => $errMsg, 'raw' => $data]);
    exit;
}

$reply = $data['choices'][0]['message']['content'];
$usage = $data['usage'] ?? [];

echo json_encode([
    'reply'  => $reply,
    'model'  => $data['model'] ?? $model,
    'usage'  => $usage,
]);
