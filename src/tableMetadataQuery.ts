export default `
SELECT
    table_name,
    to_json(array_agg(column_name)) AS column_names,
    to_json(array_agg(data_type)) AS data_types,
    to_json(array_agg(is_nullable)) AS is_nullable,
    json_agg(col_description((SELECT oid FROM pg_class WHERE relname = table_name), ordinal_position)) AS column_comments,
    obj_description((SELECT oid FROM pg_class WHERE relname = table_name), 'pg_class') AS table_comment
FROM
    information_schema.columns
WHERE
    table_catalog = current_database() AND table_schema = $1
GROUP BY
    table_name;
`;
