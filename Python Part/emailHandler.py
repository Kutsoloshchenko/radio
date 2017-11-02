from smtplib import SMTP
import datetime


class EmailHandler:
    """Class for sending emails to a client. Currently does not work.
        This will be used to send verification messages, restore password emails and some notifications """

    def __init__(self, creds, mail_service):
        """Initialization service

            inputs:
                    creds - dict with "login" and "password" keys. This credentials are used to log in to SMTP server
                    mail_service - dict with "address" and "port". This will be used to connect to SMTP server
        """
        self._mail_service = mail_service
        self._creds = creds

    def send_verification_message(self, username, user_email, link):
        """Send email to user, providing verification link
            inputs:
                    username - name that user choose during registration
                    user_email - email that user entered during registration
                    link - verification link, that user should click to verify his email
        """

        subject = "Please verify your DOPE.FM account"
        from_addr = "dope.fm@ukr.net"
        message = """Dear %s\n You have signed up on dope.fm.com website.
                     Please click the link below to verify you account\n %s""" % (username, link)

        self._send_email(subject, from_addr, user_email, message)

    def _send_email(self, subject, from_addr, to_addr, message):
        """Sends email to specified email
            inputs:
                    subject - subject that will be displayed in mail
                    from_addr - from witch address email should be sended
                    to_addr - to which address email should be sended
        """

        smpt = self._configure_server()
        date = datetime.datetime.now().strftime("%d/%m/%Y %H:%M" )
        msg = "From: %s\nTo: %s\nSubject: %s\nDate: %s\n\n%s" % (from_addr, to_addr, subject, date, message)
        smpt.sendmail(from_addr, to_addr, msg)
        smpt.quit()

    def _configure_server(self):
        """Configures server for sending mail, using credentials and info provided during initialization of class"""

        smtp = SMTP(self._mail_service["address"], self._mail_service["port"])
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()
        smtp.login(self._creds["login"], self._creds["password"])
        return smtp
