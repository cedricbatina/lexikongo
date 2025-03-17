(
  SELECT 'word' AS type,
    s.slug,
    w.singular,
    w.plural,
    w.phonetic,
    GROUP_CONCAT(
      DISTINCT CASE
        WHEN wm.language_code = 'fr' THEN wm.meaning
      END
      ORDER BY wm.meaning SEPARATOR ', '
    ) AS translation_fr,
    GROUP_CONCAT(
      DISTINCT CASE
        WHEN wm.language_code = 'en' THEN wm.meaning
      END
      ORDER BY wm.meaning SEPARATOR ', '
    ) AS translation_en
  FROM words w
    JOIN slugs s ON w.word_id = s.word_id
    LEFT JOIN word_meanings wm ON w.word_id = wm.word_id
  WHERE w.singular LIKE '%kiba%'
    OR w.plural LIKE '%kiba%'
    OR wm.meaning LIKE '%kiba%'
  GROUP BY w.word_id,
    s.slug,
    w.singular,
    w.plural,
    w.phonetic
)
UNION
(
  SELECT 'verb' AS type,
    s.slug,
    v.name AS singular,
    NULL AS plural,
    v.phonetic,
    GROUP_CONCAT(
      DISTINCT CASE
        WHEN vm.language_code = 'fr' THEN vm.meaning
      END
      ORDER BY vm.meaning SEPARATOR ', '
    ) AS translation_fr,
    GROUP_CONCAT(
      DISTINCT CASE
        WHEN vm.language_code = 'en' THEN vm.meaning
      END
      ORDER BY vm.meaning SEPARATOR ', '
    ) AS translation_en
  FROM verbs v
    JOIN slugs s ON v.verb_id = s.verb_id
    LEFT JOIN verb_meanings vm ON v.verb_id = vm.verb_id
  WHERE v.name LIKE '%keba%'
    OR vm.meaning LIKE '%keba%'
  GROUP BY v.verb_id,
    s.slug,
    v.name,
    v.phonetic
)
ORDER BY singular;