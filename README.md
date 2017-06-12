# Starter Chat

## Installation et exécution

1) Installer [NodeJS Installer](https://nodejs.org/en/download/)

2) Créer un repository pour votre projet

3) Cloner votre repository

4) Récupérer le starter sur votre repository:

```
git remote add starter https://github.com/NablaT/starter-chat.git
```

Pour vérifier que la commande a réussi, vous pouvez lancer:
```
git remote -v 

Result:
origin https://adresse.com/nomdevotrerepository.git (fetch) 
origin https://adresse.com/nomdevotrerepository.git (push)
starter https://github.com/NablaT/starter-chat.git (fetch) <-- Le remote starter !
starter https://github.com/NablaT/starter-chat.git (push) <-- Le remote starter !
```

Ensuite:
```
git pull starter master
```

Vous devriez avoir récupéré tous les fichiers.

5) Installer les dépendances (vous devez vous situez au niveau du package.json)

```
npm install 
```

6) Lancer le projet 

```
npm start
```

7) Ouvrez votre navigateur pour accéder à l'application à l'adresse

```
http://localhost:4200/  
```

## Architecture des fichiers

```
- node_modules <--- Contient toutes les dépendances du projet
- src
 │_ main.ts
 │_ routeur.ts
 │_ index.html
 - app <--- Contient l'ensemble des composants de l'application 
    │_ app.component.html
    │_ app.component.css 
    │_ app.component.spec.ts
    │_ app.component.ts
    │_ README.md
 - shared <--- Contient l'ensemble des éléments partagés par les composants
    - services
      │_ README.md
    - directives
      │_ README.md
    - pipes
      │_ README.md
 - assets <--- Contient l'ensemble des ressources utilisées dans le projet: images, vidéos, sons ...
 - index.html <--- Fichier html racine du projet
 - main.ts <--- Fichier d'entrée 
 
- package.json <--- Contient la configuration du projet: liste des commandes & dépendances du projet
- ...
```

Les fichiers précédemment décris sont les principaux fichiers que vous allez manipuler. Si vous souhaitez avoir plus d'informations concernant les autres fichiers, 
vous trouverez une description dans le [quickstart d'Angular](https://angular.io/docs/ts/latest/cli-quickstart.html#project-file-review)

## Tutorial

### App Component

Le composant App est le composant racine du projet (cad le plus haut). C'est à partir de lui que l'on va utiliser nos composants.

#### Structure

Comme tous les composants du projet, il est composé de 4 fichiers.

```
- app.component.css
- app.component.html
- app.component.ts
- app.component.spec.ts
- app.module.ts
```

<strong> 3 fichiers constituent un composant: </strong>
- Fichier typescript principal: `app.component.ts`. 
Il contient la classe représentant le composant `AppComponent`. 
A l'intérieur on va définir les fichier html et css du composant qui vont constituer sa vue à travers le code suivant:

```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', <--- Fichier html
  styleUrls: ['./app.component.css'] <--- Fichier de style 
})
```

On précise également le selector. Le selector est le nom utilisé dans les html pour importer un composant.
Dans le fichier index.html à la racine du projet vous pouvez voir l'utilisation du selector:

```
  <app-root>Loading...</app-root>
```

L'utilisation de la balise `<app-root>` permet l'affichage du composant dans la page.
Tous les selectors des composants que vous allez créer doivent avoir le préfix `app-`. Cela va vous permettre de reconnaitre facilement que ce sont 
vos composants et également d'éviter des conflits de nommage avec des balises HTML native (ex: vous ne pouvez pas créer un composant avec le selector div ou body). 
Si vous souhaitez utilisez votre préfix en remplacement de `app-`, ce dernier doivent suivre la structure `nom-`.

- Fichiers css et html.
Comme expliqué précédemment, ces deux fichiers vont permettre de gérer la vue du composant avec les informations à afficher et le style
à utiliser.

<strong> Enfin 2 autres fichiers constituent un composant:</strong>
- Le fichier de test: `app.component.spec.ts`. 
- Le module du composant: AppModule `app.module.ts`: <strong>configuration du composant</strong>.
Le module est un fichier essentiel pour qu'un composant puisse être utilisé car il permet d'importer ses dépendances.

```
@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    MessageListComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
```

`declarations` permet la déclaration du composant. Cette étape est obligatoire pour qu'il puisse être utilisé. Tous les composants doivent être déclarés à l'intérieur d'un module. Nous déclarons donc ici tous nos composants.
Si vous ne déclarez pas vos composants, vous aurez l'erreur suivante (cas où MessageListComponent n'est pas déclaré): 
```
'app-message-list' is not a known element:
1. If 'app-message-list' is an Angular component, then verify that it is part of this module.
```

`imports` permet d'importer tous les modules dont le composant a besoin. Chaque module peut contenir un ou plusieurs composants
Ici, les 3 premiers modules sont des modules génériques d'Angular.
- `BrowserModule` permet d'importer toutes les fonctionnalités d'Angular comme les directives `ngIf` ou `ngFor`. Ce module est importé une seule fois dans une application à l'intérieur du composant racine app. Vous n'aurez pas à le réimporter dans d'autres modules.
- `FormsModule` permet d'importer toutes les fonctionnalités liées à l'utilisation des formulares: `Form`, `ngModel` etc ... 
- `HttpModule` permet d'importer les fonctionnalités pour utiliser les requêtes http.  

Si on enlève l'importation de FormsModule à l'intérieur de `MessageFormModule` on obtient l'erreur suivante:
```
 Can't bind to 'ngModel' since it isn't a known property of 'input'.
```
Cette erreur montre que Angular ne connait pas ngModel et cherche ngModel comme étant une propriété de la balise input.

`providers` permet d'importer tous les services, directives et pipes que vous allez utiliser dans le composant App.
Si le service MessageService n'est ajouté dans la liste des providers, vous obtiendrez l'erreur suivante: 
```
No provider for MessageService.
```

`bootstrap` permet de specifier le composant d'entrée de l'application. Ce champ ne doit pas être changé ou réutiliser. Il est présent uniquement dans app.module.ts.

#### Discussion entre la classe et l'html

Comme vous pouvez le voir ci-dessous, le composant App est simple.

`AppComponent`:

```
export class AppComponent {

  public title: string;

  constructor() {
    this.title = "Chat";
  }
}
```

Un seul attribut est défini à l'intérieur de la classe: `title`. Cet attribut est public et de type string.
Il est initialisé à l'intérieur du constructeur de la classe avec la valeur "Chat". Regardons maintenant l'html.

`app.component.html`:

Dans l'html, on va s'intéresser à la partie suivante: 
```
<h1> {{title}} </h1>
<app-message-list></app-message-list>
<app-message-form></app-message-form>
```

Dans la première ligne on souhaite afficher le titre de l'application. Ce titre a été déclaré et initialisé dans `AppComponent`
précédemment. Pour afficher le titre, on va simplement insérer notre attribut `title`. L'insertion est appelée "binding". 

```
{{title}}
```

Pour insérer, on utilise les doubles accolades. Elles signifient que l'on souhaite écrire dans l'html la valeur de notre attribut.

La seconde et troisième ligne contiennent deux balises particulières: `<app-message-list>` et `<app-message-form>`. Elles permettent
d'insérer les composants `MessageListComponent` et `MessageFormComponent` dans l'html. Le nom des balises est défini dans leurs fichiers typescript 
dans le `selector`. 

`message-list.component.ts`
```
@Component({
  selector: 'app-message-list', <-- nom de la balise
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
```


`message-form.component.ts`
```
@Component({
  selector: 'app-message-form', <-- nom de la balise
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
```


#### Le CSS et l'HTML d'un composant

Un composant est une capsule fermée. Contrairement aux développements sans composant, ici un fichier CSS s'applique 
uniquement à l'intérieur de l'HTML associé.
 
Vous pouvez vérifier ce lien simplement en rajoutant une couleur au text affiché dans message-form et message-list:

`message.component.css`

```
p {
  color: red;
}
```

`message-form.component.css`

```
p {
  color: blue;
}
```

Vous pouvez constater que les deux composants ont bien des couleurs différentes alors que tous les deux ont des balises paragraphes `<p></p>`. 
Ce comportement est identique entre deux composants père/fils.


### Composant MessageForm

Le composant MessageForm est un petit formulaire permettant l'envoi d'un message. Commençons par la classe du composant.

#### MessageFormComponent 

<strong>1) Attributs </strong>

La classe contient deux attributs:
- route: Route sur laquelle envoyer le message.

Cet attribut est de type string et correspond à la route à laquelle vous souhaitez accéder pour envoyer le message.
La route correspond à la fin de l'url utilisée pour les requêtes. L'url est définie dans le service MessageService et est égale à `http://projet-3a.7ight.com/api/threads/`. 
Comme vous pouvez le voir dans la documentation de l'[API](http://projet-3a.7ight.com/docs), la route doit être de la forme: 
```
:threadId/messages avec :threadId un entier
Example: 1/messages
```
C'est avec cette valeur par défaut que l'on initialise l'attribut route.

- message: Message à afficher.

Cet attribut est de type MessageModel et correspond à l'objet message qui va être envoyé.

`MessageModel`

```
export class MessageModel {

  /**
   * Identifiant du message.
   */
  public id: number;

  /**
   * Contenu du message
   */
  public content: string;

  /**
   * Nom de la personne ayant envoyé le message
   */
  public from: string;

  /**
   * Date de création du message.
   */
  public createdAt: string;

  /**
   * Date de la mise à jour du message. Si le message n'a pas été mis à jour, par défaut la valeur sera la identique
   * à createdAt.
   */
  public updatedAt: string; 
}
```

Cet objet contient les mêmes champs que l'objet message retourné/envoyé par/à l'API. Vous retrouverez sa déclaration dans le dossier `shared/models`.

<strong>2) Constructeur</strong>

Dans le constructeur, il faut initialiser les attributs:

```
  this.message = new MessageModel(1, "Hello", "Moi"); 
  this.route = "3/messages"; // Changez l'identifiant du chanel en fonction de vos besoins.
```

<strong>3) Fonctions</strong>

`ngOnInit` [Doc](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html#the-ngoninit-lifecycle-hook)
Cette fonction est une fonction native d'Angular et sera exécutée automatiquement à création du composant après que les constructeurs de tous 
les composants de l'application aient été lancés (constructeur de MessageService inclut). Elle est très utile car elle permet d'attendre l'initialisation des attributs
et l'instantiation des services en paramêtre du constructeur. Nous verrons par la suite également son utilité avec les `@Input()` des composants.

`sendMessage`
Cette fonction permet l'envoi du message après le click de l'utilisateur sur le bouton "Search". Lorsque l'on clique sur ce bouton, nous voulons faire 
une requête HTTP POST pour envoyer le message. Seulement ce ne sont pas les composants qui sont responsables de faire cet appel mais les services. Les composants ne doivent 
s'occuper uniquement de la logique de l'interface, celle visible à l'écran (les interactions, l'affichage des données). 
Vous trouverez plus d'informations sur les services dans la description de MessageService.

#### MessageForm HTML 

Le composant doit afficher un champ input de formulaire pour que l'utilisateur puisse écrire son message et un bouton pour envoyer le message.

```
<input type="text" class="form-control" id="name" required  [(ngModel)]="message.content" name="name">
<button class="btn btn-primary" (click)="sendMessage()"> Send </button>

<br>Message model: {{message | json}}
``` 

`<input>` et `ngModel`
La balise input correspond au champs dans lequel on souhaite écrire. Cependant la balise input toute seule ne permet 
pas de stocker les données écrites. Pour cela, on utilise la directive native d'Angular appelée `ngModel`. Elle s'occupe
de la liaison entre ce qui est écrit par l'utilisateur et le model. 

```
[(ngModel)]="message.content"
```

Dans notre cas on veut stocker le message dans notre attribut `public message: MessageModel` dans le champ content de MessageModel.
Vous pouvez voir dans l'html l'impact que ngModel a sur notre attribut message grâce à `Message model: {{message | json}}` qui affiche après chaque modification
le contenu de message.

Un mot à propos des crochets & parenthèses autour de ngModel:
- []: signifie que le composant peut envoyer des données à l'élément. On appelle ça le [Property binding](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#property-binding)
- (): Signifie que l'élément peut envoyer des données/évènements au composant. Ici ngModel stock les changements du model dès qu'une modification est faite. On appelle ça le [Event binding](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#event-binding)

C'est ce que l'on appelle le two way data binding. Un peu de doc?
- [Doc officielle](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#two-way)
- [Explication ngModel et two way data binding](https://blog.thoughtram.io/angular/2016/10/13/two-way-data-binding-in-angular-2.html)

Maintenant que l'on stocke le message, on veut l'envoyer quand l'utilisateur appuie sur le bouton "Send". Pour cela on utilise la directive `(click)`:
```
<button class="btn btn-primary" (click)="sendMessage()"> Send </button>
```
Ici on peut voir qu'on utilise l'Event Binding, la fonction sendMessage() du composant sera executée au moment où l'utilisateur clique. Vous pouvez d'ailleurs le voir dans la console
de votre navigateur un "Click!" apparaitre à chaque fois.

### MessageService

Les services en Angular sont utilisés pour effectuer toutes les actions qui sont ou pourraient être partagés par plusieurs composants. Lorsque l'on souhaite utiliser 
une fonction dans plusieurs composants, cette fonction doit se trouver dans un service. 

Dans notre cas, nous avons besoin d'un service qui gère toutes les requêtes HTTP concernant les messages.
 - GET /threads/:threadId/messages
 - POST /threads/:threadId/messages

La récupération et l'envoi de messages sont des fonctionnalités qui ne peuvent pas être propres à un composant, on va donc créer le service 
MessageService qui va contenir ces fonctions-là. 

```
@Injectable()
export class MessageService {

  private url: string;

  constructor(private http: Http) {
    this.url = URLSERVER;
  }
}
```

Attributs:
 - url: Url pour accéder aux données. L'url est commune à toutes les fonctions du service. Il permet d'accéder aux chanels. À partir de cet url, vous pourrez accéder aux messages.
On initialise l'url avec la constante `URLSERVER` qui est déclarée dans le dossier `/shared/constants` dans `url.ts`.

Fonctions:
Nous avons besoin de deux fonctions: une pour recevoir la liste des messages d'un chanel et un autre pour poster un message sur le chanel.

`getMessages(route: string)` 
Cette fonction va s'occuper de la récupération des messages. Pour cela, il faut faire une requête HTTP, un GET. Nous allons utiliser 
l'url que l'on a en attribut de la classe MessageService et rajouter à l'url la route pour accéder aux messages d'un chanel. Cette route est 
donnée en paramètre de la fonction. Elle doit avoir la forme suivante: `:threadId/messages` avec `:threadId` un entier correspondant à l'identifiant du chanel.
```
const finalUrl = this.url + route;
```

Une fois l'url complet formé, il nous faut faire un GET. Pour cela nous allons utiliser la classe HTTP que nous avons en paramètre du constructeur de notre service:
```
this.http.get(finalUrl)
```

La fonction get() va lancer la requête. Une fois que la requête est lancée, nous avons besoin de définir le comportement à suivre lorsque nous recevrons le résultat de la requête.
Pour cela, la méthode get() retourne un Observable. Un observable est un flux d'évènements ouvert que l'on peut écouter. 

Ici notre observable est le flux contenant la réponse de la requête HTTP. On peut schématiser comme cela:
```
Flux: ---------------------------------------------------REPONSE--------------> temps 
      t0:                 t1:                            t2:
      le flux est         pas de réponse du              le serveur a renvoyé
      créé                serveur                        la réponse
```

La méthode get() crée ce flux d'évènement pour nous permettre de l'écouter et de récupérer la réponse au moment où elle est disponible. 
Les objets Observables possèdent un grand nombre d'operateurs (fonctions) permettant de les manipuler. Nous allons en utiliser un seul:
- `subscribe()`: Le plus important. Il permet de démarrer l'écoute de l'Observable et de définir le comportement à faire lorsque que les données sont reçues.
Dans notre cas, nous allons appeler la fonction `extractAndUpdateMessageList()` à la réception de la réponse afin d'extraire les données et de mettre à jour notre liste
de messages à partir des données.

```
.subscribe((messageList) => this.extractAndUpdateMessageList(response)); // On souscrit à (s'abonne à ou écoute) l'observable
```

Pour plus d'information concernant les Observables et le subscribe():
-  [Video tutoriel](http://www.meanjs.fr/rxjs-tutoriel-1-creer-un-observable/): Vous pouvez suivre le tutoriel si vous le souhaitez. Juste une remarque, 
vous n'avez pas besoin d'importer le CDN de rxjs (comme expliqué au début de la vidéo) ni d'utiliser `Rxjs` quand vous souhaitez manipuler des observables, il vous suffit de faire:
```
import { Observable } from "rxjs/Observable"; // importer Observable from rxjs.
[..]
Observable.create((observer) => { // utiliser les observables directement comme ceci.
    // vos actions next.
})
```

Voici notre fonction getMessages() finale permettant de récupérer les messages à partir d'une requête HTTP GET.

```
public getMessages(route: string) {
    const finalUrl = this.url + route;
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
}
```

`extractAndUpdateMessageList()`

Comme expliqué précedemment, cette fonction permet d'extraire les données de la réponse et de mettre à jour notre liste de messages.

```
extractAndUpdateMessageList(response: Response) {
    const messageList = response.json() || []; // Extraction des données grâce à la méthode json() de la classe Response.
    this.messageList$.next(messageList); // On pousse les nouvelles données dans l'attribut messageList$
}
```

1) Extraction des données:
La réponse reçue par la requête est de type Response. Pour ceux qui utilise WebStorm, faites CTRL + Click sur Response dans le service pour voir sa déclaration et sa documentation.

`Response` 
```
    type: ResponseType;
    ok: boolean;
    url: string;
    status: number;
    statusText: string | null;
    bytesLoaded: number;
    totalBytes: number;
    headers: Headers | null;
```

Elle possède des attributs intéressants permettant sur la réponse reçue. Ce qui nous intéresse ici c'est le body de la réponse 
pour pouvoir récupérer les données. Le body est présent dans la classe Body, classe que Response extends.

`Body` 
```
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    json(): any;
    text(encodingHint?: 'legacy' | 'iso-8859'): string;
    arrayBuffer(): ArrayBuffer;
    blob(): Blob;
```

On voit ici la méthode `.json()` qui permet de récupérer notre body. N'hésitez pas à aller voir les classes Responses et Body si, il y a beaucoup
de documentation pour vous aider à manipuler les réponses (ici nous avons volontairement enlevé la documentation dans les exemples au-dessus). 

2) Push des messages sur `messageList$`

`messageList$` est notre flux contenant la liste des messages. Il est de type ReplaySubject, c'est un type d'Observable particulier 
que l'on peut initialiser. On définit que le type de données que l'on trouvera dans ce flux sera un tableau de MessageModel.

```

  public messageList$: ReplaySubject<MessageModel[]>; // Déclaration de l'attribut comme ReplaySubject de MessageModel[]
  [...]
  constructor(private http: HTTP) {
    [...]
    this.messageList$ = new ReplaySubject(1); // On instancie messageList
    this.messageList$.next([new MessageModel()]); // On initialise le contenu de l'observable avec un premier message vide. 
  }
  [...]
  extractAndUpdateMessageList(response: Response) { // On reçoit les données de la requête
      const messageList = response.json() || []; // Extraction des données grâce à la méthode json() de la classe Response.
      this.messageList$.next(messageList); // On pousse les nouvelles données dans l'attribut messageList$
  }
```

Le composant MessageListComponent souscrit à messageList. C'est à dire qu'il va écouter le flux d'évènement et à chaque fois 
qu'un évènement est levé avec des nouvelles données, il va les récupérer et le stocker dans sa liste de messages.
```
    this.messageListService.messageList$.subscribe((messages) => this.messageList = messages);
```

A la construction du service le composant va donc recevoir le message vide et ensuite une fois que les messages sont reçus du serveur, 
il va recevoir la liste complète des messages.

On peut représenter messageList$ comme cela:
```
messageList$: -[MessageModel()]-----------------------------[message1, message2, message3 ...]----------------------->
               Initialisation avec                          Une fois que le getMessages a été lancé
               un messageModel()                            on reçoit les messages et on les poussent dans 
                                                            messageList$. Chaque message (message1, message2 ...)
                                                            est de type MessageModel.
```

Maintenant que nous avons toutes les fonctionnalités dans le service pour récupérer les messages, passons à l'envoie d'un message.

`sendMessages()`

Pour envoyer un message il suffit de faire une requête HTTP POST avec le message que l'on souhaite envoyer sur:

```
https://projet-3a.7ight.com/api/threads/:threadId/messages
```

Pour avoir plus d'informations sur le POST, vous pouvez consulter l'API: [METHODE POST](http://projet-3a.7ight.com/docs/#api-ThreadsMessages-PostThreadsMessages)

La méthode sendMessage va prendre deux paramètres:
- route: La route pour acceder aux messages. C'est le meme principe que pour getMessages.
- message: Le message à poster. Le message est de type MessageModel et est envoyé par un composant.

Ensuite il nous faut construire le Header et les Options de notre requête. pour cela on va utiliser les classes Headers et RequestOptions, 
de `@angular/http`. Pour le Header, nous précisons que les données envoyées sont de type JSON pour pouvoir envoyer directement notre objet message.

Enfin, il nous faut utiliser this.http et la méthode post() pour envoyer le message.

Vous pouvez trouver sur cette page un exemple d'utilisation de méthode post: [Send data](https://angular.io/docs/ts/latest/guide/server-communication.html)

En combinant l'implémentation de la méthode getMessages() et l'exemple que vous trouverez sur le lien précédent, vous êtes en mesure d'envoyer un message.. HF ! :D

`extractMessageAndGetMessages()`

Cette fonction permet d'extraire les données reçues à travers les requêtes HTTP. Elle est appelée dans la fonction sendMessage et permet de directement récuperer un MessageModel. 
Elle va également faire un nouvel appel pour récupérer la liste complète des messages pour pouvoir mettre à jour la liste des messages dans les composants.

### MessageList component

`constructor`

Dans le constructeur, on va injecter le service MessageService en le passant en paramètre du constructeur. C'est la seule
étape nécessaire pour pouvoir utiliser le service à l'intérieur des composants (+ l'ajout dans le module de app.module dans la partie provider!). 

En plus du service, on va initialiser notre route pour accéder aux messages.
```
constructor(private messageService: MessageService) {
    this.route = "1/messages";
}
```

`ngOnInit` [Doc](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html#the-ngoninit-lifecycle-hook)

Cette fonction est appelée après l'exécution de tous les constructeurs de toutes les classes typescript. L'utilisation des services 
dans le NgOnInit est une bonne practice. Le constructeur ne doit servir qu'à l'initialisation simple des variables. 

Ici nous utilisons le ngOnInit pour récupérer la liste des messages. Pour cela on passe par la fonction getMessages de notre MessageService.
```
ngOnInit() {
    this.messageListService.getMessages(this.url);
    this.messageListService.messageList$.subscribe((messages) => this.messageList = messages);
  }
```
Il nous faut également récupérer la liste des messages. Souvenons-nous, les messages sont stocker dans l'attribut messageList$ qui est notre
flux ouvert d'évènement qui va nous notifier toutes les nouvelles listes de messages. Pour commencer l'écoute (l'abonnement), il suffit 
d'exécuter la fonction subscribe. Au moment ou un subscribe est fait, l'écoute reste ouverte jusqu'à ce que le composant soit détruit (à la fermeture de la page). 
Il vous suffit maintenant de définir le comportement à adopter lorsque vous recevez les messages. Ici c'est simple, on stock les messages dans notre 
attributs mesageList.
L'attribut messageList sera mise à jour à chaque fois que la méthode getMessages du service MessageService sera appelé! Votre liste de message restera donc
à jour.

#### MessageList HTML

Dans la classe MessageListComponent, nous avons lancé la requête à travers le service pour récupérer tous les messages.
Maintenant il faut les afficher. Nos messages sont stockés dans l'attribut messageList qui est un tableau de MessageModel. 

Pour les afficher il suffit de faire une boucle for dans l'html. Pour tous les messages de notre liste de messages, nous voulons les afficher.
```
<div *ngFor="let currentMessage of messageList"> // currentMessage est le message courant dans la boucle. On boucle sur tous les messages
                                                 // de messageList.
  <app-message [message]="currentMessage"></app-message> // On donne notre message courant en Input (en entrée, paramètre) 
                                                        // du composant Message qui va lui l'afficher.
</div>
```

### Message

#### MessageComponent

MessageComponent est relativement simple. Sa particularité c'est l'attribut @Input().
```
export class MessageComponent implements OnInit {

  @Input() message: MessageModel;

  constructor() {
    this.message = new MessageModel(0, "Hello!");
  }
  
  ngOnInit() { }
}
```

Un attribut @Input est un attribut qui peut être modifier par un composant parent. C'est le cas ici, le composant
message-list va donner en paramètre de notre composant message le MessageModel à afficher. Une fois que MessageListComponent
a reçu les données du serveur, tous les messages vont s'afficher dans plusieurs composants message. 

Pour avoir plus d'informations sur les @Input: [Docs + Exemples](https://angular.io/docs/ts/latest/cookbook/component-communication.html)

On initialise le message avec un message par default. Nous allons voir que notre attribut message est utilisé dans l'html, 
si vous ne l'initialiser pas et que l'Input n'a pas été spécifié, une erreur va se produire car le composant va essayer 
d'afficher un attribut `undefined`.

#### Message HTML

On affiche simplement notre message:
```
<p>
  Message: <strong> {{message.content}} </strong> <br>
  From: <strong>{{message.from}}</strong>
</p>
```


## Debug

`debugger`

Si vous avez besoin de debugger votre code typescript, vous pouvez utiliser le `debugger`. Il s'utilise comme cela:
```
public getMessages(route: string) {
    const finalUrl = this.url + route;
    debugger; <---------------
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
}
```

Lorsque votre application va se relancer, elle s'arrêtra au niveau de la ligne du `debugger;`. Vous pouvez à ce moment là utiliser la console de votre navigateur 
pour voir l'état de votre application ou alors utiliser les différentes fonctionnalités du debugger de votre navigateur comme l'avancé step by step. 
Plus d'information sur l'utilisation du [debugger de Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/). 
 
`console.log()`
Si vous voulez faire apparaitre une variable dans la console de chrome ou faire une trace, vous pouvez simplement utiliser `console.log`:
```
public getMessages(route: string) {
    const finalUrl = this.url + route;
    console.log("Final url: ", finalUrl); <------ 
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
}
```

## Liens utiles

### Warning

Attention, nous travaillons avec une version d'Angular supérieur à 2. 
La première version d'Angular appelée Angular 1 ou AngularJS n'est pas compatible avec toutes les versions supérieures à 2 d'Angular (inclue). 
Pour éviter les problèmes de version lors de vos recherches de documentation ou de bugs fix, pensez à préciser <strong> Angular 2 </strong>.

### Liens

Documentation API:

- [Doc](http://projet-3a.7ight.com/docs)
- [Liste des messages Chanel 1](http://projet-3a.7ight.com/api/threads/1/messages)

Documentation Angular 2: 

- [Directives](https://angular.io/docs/ts/latest/guide/attribute-directives.html)
- [Pipes](https://angular.io/docs/ts/latest/guide/pipes.html)
- [Services](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html)
- [Formulaires: "Template Driven Form"](https://angular.io/docs/ts/latest/guide/forms.html)
- [Requêtes HTTP avec Angular](https://angular.io/docs/ts/latest/guide/server-communication.html)
- [NgOnInit](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html#the-ngoninit-lifecycle-hook)
- [@Input et @Ouput](https://angular.io/docs/ts/latest/cookbook/component-communication.html)

Documentation sur les Observables:

- [Documentation Officielle rxjs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)
- [Video Tutoriel débutant FR](http://www.meanjs.fr/rxjs-tutoriel-1-creer-un-observable/)
- [Tutoriel FR](http://home.heeere.com/tech-intro-programmation-reactive.html)

