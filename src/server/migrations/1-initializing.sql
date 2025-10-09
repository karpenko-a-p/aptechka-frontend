create table if not exists users
(
    id       bigserial primary key,
    login    varchar(32) unique,
    password text
);

create table if not exists news
(
    id          bigserial primary key,
    title       varchar(128),
    content     text,
    create_date date
);

create table if not exists categories
(
    id          varchar(32) primary key,
    name        varchar(64),
    description text,
    banner      text
);

create table if not exists categories_key_words
(
    category_id varchar(32),
    key_word    varchar(32),
    PRIMARY KEY (category_id, key_word),
    FOREIGN KEY (category_id) references categories (id)
);

create table if not exists products
(
    id          bigserial primary key,
    category_id varchar(32),
    name        varchar(128),
    description text
);

insert into products (category_id, name, description)
values ('cat-1', 'Product 1', 'Product description'),
       ('cat-1', 'Product 2', 'Product description'),
       ('cat-2', 'Product 3', 'Product description long'),
       ('cat-2', 'Product 4', 'Product description text'),
       ('cat-3', 'Product 5', 'Product description from category 3');


insert into news (title, content, create_date)
values ('Подорожали лекарства', 'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet',
        now()),
       ('Подорожали лекарства 2', 'lorem ipsum dolor sit amet', now()),
       ('Подорожали лекарства 3', 'lorem ipsum dolor lorem ipsum dolor sit amet', now());

insert into categories (id, name, description, banner)
values ('cat-1', 'Category one', 'Category one long description, very very long description about this category...',
        'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
       ('cat-2', 'Category two', 'Category two long description',
        'https://images.unsplash.com/photo-1655174041849-49ed985e9ffb?q=80&w=3136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
       ('cat-3', 'Category three', 'Category three long description',
        'https://images.unsplash.com/photo-1544829894-eb023ba95a38?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
       ('cat-4', 'Category four', 'Category four long description',
        'https://images.unsplash.com/photo-1610542443439-279b81fba808?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

insert into categories_key_words (category_id, key_word)
values ('cat-1', 'some'),
       ('cat-1', 'keys'),
       ('cat-1', 'words'),
       ('cat-2', 'some'),
       ('cat-2', 'other'),
       ('cat-2', 'keys'),
       ('cat-2', 'words'),
       ('cat-3', 'pills'),
       ('cat-3', 'steroids'),
       ('cat-3', 'paracetamol'),
       ('cat-4', 'pharma');




