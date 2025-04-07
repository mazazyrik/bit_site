import logging
from fastapi import (
    APIRouter,
    HTTPException
)
from .schemas import FormSchema
from orm import Form
from sheets import write_to_sheets

router = APIRouter(prefix="/api", tags=["API"])


@router.post('/form', status_code=201)
async def form(data: FormSchema):
    try:
        form = Form.create(name=data.name, email=data.email,
                           vuz=data.vuz, birth=data.birth)
    except Exception as e:
        logging.error(e)
        raise HTTPException(
            status_code=400, detail="Не удалось сохранить форму")
    try:
        write_to_sheets(form.id, form.name, form.email, form.vuz, form.birth)
    except Exception as e:
        logging.error(e)
