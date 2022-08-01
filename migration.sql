--garage database
DROP TABLE IF EXISTS links;
DROP TABLE IF EXISTS link to link;

CREATE TABLE links (
   id SERIAL PRIMARY KEY,
    url TEXT,
    host TEXT,
    lastSeen TIMESTAMPTZ
);

CREATE TABLE link-to-link (
    id serial PRIMARY KEY,
    link_id INTEGER,
    referred_by INTEGER,
    time_collected TIMESTAMPTZ,
    FOREIGN KEY (link_id) REFERENCES links (id) ,
    FOREIGN KEY (referred_by) REFERENCES links (id)
);
