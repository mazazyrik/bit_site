from pydantic import BaseModel


class FormSchema(BaseModel):
    name: str
    email: str
    vuz: str
    birth: str
