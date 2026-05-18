import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getMessaging,
    getToken,
    onMessage
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

const firebaseConfig = {

    apiKey: "AIzaSyBQEe9S8htMkLviw456Ey0eneQNY2W8swc",

    authDomain: "pacasa-69044.firebaseapp.com",

    projectId: "pacasa-69044",

    storageBucket: "pacasa-69044.firebasestorage.app",

    messagingSenderId: "671747884392",

    appId: "1:671747884392:web:efd9e5948df4906d3a82dd",

    measurementId: "G-W50F57RNP5"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

async function iniciarNotificaciones(){

    try{

        const permiso = await Notification.requestPermission();

        if(permiso !== "granted"){

            alert("Debes permitir notificaciones");

            return;
        }

        const registration = await navigator.serviceWorker.register(
            "/static/firebase-messaging-sw.js"
        );

        const token = await getToken(messaging, {

            vapidKey: "BBM5siGXXilRNvKk07vCeCmg-ny-CpQ0lrd8VSkCZ3RsPEPFGYAfgauKV5xBJdtvDVF6BJmLbpCJ5CHDAm69M4A",

            serviceWorkerRegistration: registration

        });

        console.log("================================");

        console.log("TOKEN DEL CELULAR:");

        console.log(token);

        console.log("================================");

    }
    catch(error){

        console.error(error);

    }

}

iniciarNotificaciones();

onMessage(messaging, (payload) => {

    new Notification(
        payload.notification.title,
        {
            body: payload.notification.body
        }
    );

});