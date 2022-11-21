# tic-tac-toe-by-tiphaine
Défi STUDI 02/2022 tic-tac-toe

**TRELLO DU PROJET** 
![Trello](https://user-images.githubusercontent.com/90333029/154997072-92e5aa8f-a0dd-4303-beac-d439049e2f06.png)

**MAQUETTE DU PROJET VERSION MOBILE**
<img width="949" alt="mobile-maquette" src="https://user-images.githubusercontent.com/90333029/157853763-52b0fa95-dd36-4503-9914-a3b8756fa060.png">

**MAQUETTE DU PROJET VERSION DESKTOP**
<img width="924" alt="desktop-maquette" src="https://user-images.githubusercontent.com/90333029/157853904-6619921b-dd50-4a35-9d77-05ea59cb7892.png">

Ce projet est réalisé dans le cadre de ma formation. Il s'agit du défi du mois de Février : "réaliser un tic-tac-toe responsive".  

Comme le tic-tac-toe se joue principalement à l'école j'ai voulu reproduire cette ambiance.  

Il existe deux façons de jouer : contre un ami à côté et contre l'ordinateur.  
Sur la version conte l'ami à côté vous pourrez donner vos prénoms et choisir votre couleur.  
Sur la version contre l'ordinateur, vous pouvez décider qui commence.

Langages utilisés : HTML , CSS et javascript.  

---- NOUVEAU DÉPLOIEMENT : NETLIFY ----  
Le projet est maintenant hébergé sur Netlify suite à l'arrêt d'Heroku version gratuite.
Lien du projet hébergé : https://tic-tac-toe-by-tiphaine.netlify.app/ 

---- ANCIEN DÉPLOIEMENT : HEROKU GRATUIT ----  
Pour pouvoir déployer sur Heroku j'avais installé un serveur node avec express :  

**SERVEUR NODE.JS** :  
-tapez la commande node server.js  
-npm start  
-Ouvrir navigateur et taper localhost:3000 pour lui envoyer une requête  

**FRAMEWORK NODE : EXPRESS** :  
-Exécuter express avec la commande : node server.js    

**-HEROKU** :
-heroku login // à chaque fois  
-heroku create  + (nom de l'application) // une seule fois   
-git push heroku master // à chaque fois  
-heroku open   

**Sources :**   
Les icones des boutons viennent principalement de Flaticon:  
Question mark : https://www.flaticon.com/free-icon/question-mark_57108?term=question%20mark&page=1&position=7&page=1&position=7&related_id=57108&origin=search  
Home : https://www.flaticon.com/free-icon/home_25694?term=home&page=1&position=3&page=1&position=3&related_id=25694&origin=search  
Previous png : https://imgbin.com/png/tvcraRGb/enter-key-button-arrow-png  
L'image des craies et vient de Pixabay :  https://pixabay.com/fr/photos/craie-color%c3%a9-poussi%c3%a8re-l-%c3%a9cole-4829602/  
 
_Dans un souci de performance au chargement de la page, j'ai préféré simplifier l'animation du gagnant plutôt que de mettre un background image qui mettait du temps à se charger.  
Finalement je n'ai pas installé de base de données._  
