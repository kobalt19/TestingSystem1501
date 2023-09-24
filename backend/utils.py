from string import ascii_lowercase, ascii_uppercase, digits

ALLOWED_CHARS = ascii_uppercase + ascii_lowercase + digits


def is_password_correct(passwd):
    if len(passwd) < 8:
        return False
    if not all(c in ALLOWED_CHARS for c in passwd):
        return False
    if not any(c in ascii_lowercase for c in passwd):
        return False
    if not any(c in ascii_uppercase for c in passwd):
        return False
    if not any(c in digits for c in passwd):
        return False
    return True
