--garage database
DROP TABLE IF EXISTS link_to_link;
DROP TABLE IF EXISTS links;

CREATE TABLE links (
   id SERIAL PRIMARY KEY,
    url TEXT UNIQUE,
    host TEXT,
    lastSeen TIMESTAMPTZ
);

CREATE TABLE link_to_link (
    id serial PRIMARY KEY,
    link_id INTEGER,
    referred_by INTEGER,
    time_collected TIMESTAMPTZ,
    FOREIGN KEY (link_id) REFERENCES links (id) ON DELETE CASCADE,
    FOREIGN KEY (referred_by) REFERENCES links (id) ON DELETE CASCADE
);