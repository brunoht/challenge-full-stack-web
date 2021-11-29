create table students
(
    id BIGINT auto_increment,
    name varchar(100) not null,
    email varchar(250) not null,
    ra varchar(20) not null,
    cpf varchar(11) not null,
    created_at timestamp default now() null,
    updated_at timestamp default now() null,
    constraint students_pk
        primary key (id)
);

create unique index students_ra_uindex
	on students (ra);

