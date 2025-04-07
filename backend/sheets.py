# flake8: noqa
import logging
import requests

url = (
    "https://script.google.com/macros/s/AKfycbwUaHXoe3uAfCQJvfiCaXie6SJk6EPBZs--esCQuRlQ--q_M1T_Q0KSx3kGSPQBTtq2/exec"
)


def write_to_sheets(id, name, email, vuz, birth):
    data = {
        "id": id,
        "name": name,
        "email": email,
        "vuz": vuz,
        "birth": birth
    }
    try:
        requests.post(url, json=data)
    except Exception as e:
        logging.error(e)
