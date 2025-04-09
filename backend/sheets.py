# flake8: noqa
import aiohttp
import logging


url = (
    "https://script.google.com/macros/s/AKfycbwUaHXoe3uAfCQJvfiCaXie6SJk6EPBZs--esCQuRlQ--q_M1T_Q0KSx3kGSPQBTtq2/exec"
)


async def write_to_sheets(id, name, email, vuz, birth):
    data = {
        "id": id,
        "name": name,
        "email": email,
        "vuz": vuz,
        "birth": birth
    }
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(url, json=data) as response:
                response.raise_for_status()
        except Exception as e:
            logging.error(e)
