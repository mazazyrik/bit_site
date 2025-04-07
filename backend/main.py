from typing import Annotated

from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import RedirectResponse

from orm import User
from api import routers

security = HTTPBasic()
app = FastAPI(title='BIT RANEPA')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(routers.router)


@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html(
    request: Request,
    credentials: Annotated[HTTPBasicCredentials, Depends(security)]
):
    username = credentials.username
    password = credentials.password

    try:
        user = User.get(User.username == username, User.password == password)
    except User.DoesNotExist:
        return RedirectResponse(url="/")

    if user.is_admin:
        return get_swagger_ui_html(
            openapi_url=app.openapi_url,
            title=app.title + " - Swagger UI",
            oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url
        )

    return RedirectResponse(url="/")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
