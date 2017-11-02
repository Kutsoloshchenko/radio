"""Module for accsessing and writing data to a DB. Is used as a lightweight Model of the MVC pattern"""

#encoding=utf-8

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.expression import func
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import sessionmaker
from os import urandom
from time import gmtime

Base = declarative_base()


class users(Base):
    """Table of all users of the web site. Contains Email, ID, Username, Password"""
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(Text(15000))
    login = Column(Text(15000))
    password = Column(Text(15000))

    def __repr__(self):
        return ("id = %s, email = %s, login = %s, password = %s") % (self.id, self.email, self.login, self.password)


class restoreTable(Base):
    """Table that contains links to a restore password. In future will be used to validate email also"""
    __tablename__ = "restoreTable"
    id = Column(Integer, primary_key=True)
    email = Column(Text(15000))
    link = Column(Text(15000))
    time = Column(Text(15000))

    def __repr__(self):
        return ("id = %s, email = %s, link = %s, timestamp = %s") % (self.id, self.email, self.link, self.time)


class DataBase:
    """Class that provides accses to a DB and all actions that have influance on DB"""

    def __init__(self):
        """Initialize method, creates Session and connects to a DB.
        In future it will create tables if there are not existing yet"""

        self.engine = create_engine("postgresql://postgres:abcd12345!!!@localhost/dope", encoding='utf-8')
        session = sessionmaker(bind=self.engine)
        self.session = session()
        self.tables = (users, restoreTable)

    def _get_table(self, table_name):
        """Returns table object with provided name"""

        for table in self.tables:
            if table_name == table.__tablename__:
                return table

    def _get_db_entry(self, base, key_argument):
        """returns a DB entry that corresponds to a given argument

            Args:
                table_name -- Name of the Table, from where data should be retrived
                key_argument - tuple, that contains name of the column (first item), and value (second)

        """
        return self.session.query(base).filter(getattr(base, key_argument[0])==key_argument[1]).first()

    def _remove_entry(self, table=None, key_argument=None, entry=None):
        """ Method to delete entry from DB.

            Args:
                table -- Name of the table, from where entry should be deleted. Default value - None
                key_argument -- tuple, that contains name of the column (first item), and value (second). Default value - None
                entry -- BD entry object, default value - None

            This function ether takes only DB Entry object, which can be retrived from other methods, or table name and
            tuple of key-value format, to first find DB entry that should be deleted.

        """

        if not entry:
            entry = self._get_db_entry(self._get_table(table), key_argument)
        self.session.delete(entry)
        self.session.commit()

    def get_email_and_pwd(self, table_name, email):
        """Method that is used to retrive username and password. Used in sign in procedure."""

        entry = self._get_db_entry(self._get_table(table_name), ("email", email))
        if entry:
            return entry.email, entry.password
        else:
            return False, False

    def get_username_and_id(self, email=None, username = None):
        """Method that is used to retrieve username and id.
         Used in token creation and verification process."""

        if email:
            entry = self._get_db_entry(self._get_table("users"), ("email", email))
        else:
            entry = self._get_db_entry(self._get_table("users"), ("login", username))

        if entry:
            return entry.login, entry.id
        else:
            return False, False

    def add_record(self, table_name, values):
        """Method to add entry to a DB
            Args:
                table_name -- name of table to which entry should be added
                values -- dict with pair name of column - value
        """

        table = self._get_table(table_name)
        id = self.session.query(func.Max(table.id).label("max_score")).one()

        entry = table()
        if id[0].__str__() == "None":
            entry.id = 0
        else:
            entry.id = id.max_score + 1

        for key in values:
            setattr(entry, key, values[key])

        self.session.add(entry)
        self.session.commit()

    def create_and_add_restore_link(self, email):
        """Creates restore password link and adds it to a DB

            Args:
                email -- email of a users that needs to reset password

        """

        link = str(urandom(24)).replace('\\', '')
        time = gmtime()
        time = "%d %d %d %d %d" % (time.tm_hour, time.tm_min, time.tm_mday, time.tm_mon, time.tm_year)
        self.add_record("restoreTable", {"email": email, "link": link[1:], "time": time})

    def change_password(self, password, link):
        """Method to change password of the user

            Args:
                password -- new password that should replace old password in DB
                link -- restoration link, that is used to verify user

         """

        # finds entry with coresponding link and retrives email
        remove_entry = self._get_db_entry(self._get_table("restoreTable"), ("link", link))
        email = remove_entry.email

        # Entry with specified link is removed from restoreTable
        self._remove_entry(entry = remove_entry)

        # with email we can find needed DB entry, and change password
        entry = self._get_db_entry(self._get_table("users"), ("email", email))
        entry.password = password
        self.session.commit()

    def correct_link(self, link):
        """Method to verify that link to restore password is correct and not expired"""

        entry = self._get_db_entry(self._get_table("restoreTable"), ("link", link))

        if entry:
            time = gmtime()
            hour, min, day, mon, year = entry.time.split()
            if time.tm_year > int(year) or\
                time.tm_mon > int(mon) or\
                time.tm_mday > int(day) or\
                time.tm_hour*60 + time.tm_min > int(hour)*60 + int(min) +30:
                self._remove_entry(entry=entry)
                return False, "Link Expired"
            else:
                return True, None
        return False, "Is not a valid link"

    def contains(self, table_name, key_argument):
        """ Method that verifies is providet table contains providet value

            Args:
                table_name -- Name of the Table, which is used for checking
                key_argument - tuple, that contains name of the column (first item), and value (second)

        """

        if self._get_db_entry(self._get_table(table_name), key_argument):
            return True
        else:
            return False


if __name__ == "__main__":

    DB = DataBase()