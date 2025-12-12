<?php
header('Content-Type: text/html; charset=utf-8');

$feedUrl = 'https://www.ersupalermo.it/?format=feed&order=asc&type=rss';
$maxItems = 8;

// Cache (15 minuti)
$cacheFile = __DIR__ . '/ersu_cache.xml';
$cacheTtl  = 15 * 60;

$xmlString = null;

if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTtl)) {
  $xmlString = file_get_contents($cacheFile);
} else {
  $ctx = stream_context_create([
    'http' => ['timeout' => 6, 'user_agent' => 'StudentiPalermo/1.0']
  ]);
  $xmlString = @file_get_contents($feedUrl, false, $ctx);
  if ($xmlString) file_put_contents($cacheFile, $xmlString);
}

if (!$xmlString) {
  echo "<p>Notizie ERSU non disponibili al momento.</p>";
  exit;
}

$xml = @simplexml_load_string($xmlString);
if (!$xml || !isset($xml->channel->item)) {
  echo "<p>Errore nel caricamento delle notizie.</p>";
  exit;
}

echo '<div class="ersu-widget">';
echo '<h3>News ERSU Palermo</h3><ul>';

$count = 0;
foreach ($xml->channel->item as $item) {
  if ($count++ >= $maxItems) break;

  $title = htmlspecialchars((string)$item->title, ENT_QUOTES, 'UTF-8');
  $link  = htmlspecialchars((string)$item->link,  ENT_QUOTES, 'UTF-8');
  $date  = date('d/m/Y', strtotime((string)$item->pubDate));

  echo "<li>
          <a href=\"$link\" target=\"_blank\" rel=\"noopener\">$title</a>
          <small> – $date</small>
        </li>";
}

echo '</ul>';
echo '<p style="font-size:12px">Fonte: <a href="https://www.ersupalermo.it" target="_blank" rel="noopener">ERSU Palermo</a></p>';
echo '</div>';
