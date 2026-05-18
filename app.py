from flask import Flask, render_template
import os
import firebase_admin
from firebase_admin import credentials, messaging
from datetime import datetime

app = Flask(__name__)

# Firebase desde Render
firebase_config = {
    "type": "service_account",
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n")
}

if not firebase_admin._apps:
    cred = credentials.Certificate(firebase_config)
    firebase_admin.initialize_app(cred)

TOKEN_CELULAR = "fcYcnp9YVsv8xGVobWFwZU:APA91bHwDrWeXxZ9pcCpgZ7mb3-iJXNj4WjnlsGr41x5Q81F0iCG1vt76X1drnnXOl-601C45tvGYuVcdcnQJfaATWHsIT5dYBOKjl7oQb7rWVKfT6XtNeU"

pagos = [
    {"nombre":"💳 Gabriela BAC","monto":330000,"vence":10,"pagado":False},
    {"nombre":"💳 Jonaikel BAC","monto":95000,"vence":4,"pagado":False},
    {"nombre":"💳 Personal Coocique","monto":150000,"vence":18,"pagado":False},
    {"nombre":"💳 Hipotecario Coocique","monto":115000,"vence":18,"pagado":False},
    {"nombre":"🚗 Carro","monto":100000,"vence":5,"pagado":False},
    {"nombre":"💡 Luz","monto":35000,"vence":28,"pagado":False},
    {"nombre":"🌐 Internet","monto":50000,"vence":18,"pagado":False},
    {"nombre":"📦 Agua","monto":12000,"vence":28,"pagado":False}
]

@app.route("/")
def inicio():
    return render_template("index.html")

@app.route("/verificar-pagos")
def verificar_pagos():

    hoy = datetime.now().day
    enviados=[]

    for pago in pagos:

        if pago["pagado"]:
            continue

        dias_faltantes = pago["vence"] - hoy

        if 0 <= dias_faltantes <= 7:

            mensaje = messaging.Message(
                notification=messaging.Notification(
                    title="⚠️ Pago próximo",
                    body=f'{pago["nombre"]} vence en {dias_faltantes} días. Monto ₡{pago["monto"]:,}'
                ),
                token=TOKEN_CELULAR
            )

            messaging.send(mensaje)
            enviados.append(pago["nombre"])

    return {
        "ok":True,
        "enviados":enviados
    }

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT",5000))
    )
