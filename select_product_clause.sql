SELECT
  products.id,
  products.size,
  products.description,
  products.price,
  GROUP_CONCAT(
    DISTINCT products_colors.colors_id SEPARATOR ', '
  ) AS color_ids,
  GROUP_CONCAT(
    DISTINCT products_images.image_url SEPARATOR ', '
  ) AS image_urls,
  GROUP_CONCAT(
    DISTINCT products_occasions.occasions_id SEPARATOR ', '
  ) AS occasions_ids,
  GROUP_CONCAT(
    DISTINCT products_tags.tags_id SEPARATOR ', '
  ) AS tags_ids,
  GROUP_CONCAT(
    DISTINCT products_types.product_types_id SEPARATOR ', '
  ) AS product_types_ids
FROM
  products
LEFT OUTER JOIN
  products_colors ON products_colors.products_id = products.id
LEFT OUTER JOIN
  products_tags ON products_tags.products_id = products.id
LEFT OUTER JOIN
  products_images ON products_images.products_id = products.id
LEFT OUTER JOIN
  products_occasions ON products_occasions.products_id = products.id
LEFT OUTER JOIN
  products_types ON products_types.products_id = products.id
WHERE EXISTS (SELECT 1 FROM products_colors WHERE products_colors.colors_id IN (3,4) AND products.id = products_colors.products_id)
AND
EXISTS (SELECT 1 FROM products_types WHERE products_types.product_types_id IN (3,4) AND products.id = products_types.products_id)
GROUP BY
  products.id