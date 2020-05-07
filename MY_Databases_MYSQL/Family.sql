create table Family
(
	family_id int auto_increment
		primary key,
	family_name char(40) not null,
	family_DOB char(40) not null,
	family_address varchar(30) null,
	family_city char(25) null,
	family_state char(25) null,
	family_phonenumber varchar(15) null,
	family_email varchar(100) not null,
	family_gender varchar(15) null,
	family_relation varchar(20) null
);

