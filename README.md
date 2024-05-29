# Project - Vue App
### Eerste keer opstarten:
- Open de powershell en voer de code 'npm install' uit.
- In de powershell voer de code 'npm run dev' uit.

### Opstarten: 
- Open de powershell en voer de code 'npm run dev' uit.

### Applicatie builden:
- Voer 'npm run build' uit in de powershell.
- Voer 'firebase deploy' uit in de powershell.

### Bij e.v.t. problemen:
- build errors (mogelijke oplossingen):
- - In de powershell voer de code '$env:NODE_OPTIONS = "--openssl-legacy-provider"' uit.


### Functionaliteiten
#### Je kunt:
1. inloggen/registreren.
2. een deel van de site bekijken zonder in te loggen.
3. registreren als coach.
4. filteren op specialiteiten van de coaches.
5. coaches berichten sturen.

#### De site:
1. zet je automatisch naar het hoofdmenu bij in en uitloggen.
2. zet de coaches in rijen van twee als er zes of meer coaches zijn.
3. logt je automatisch in.
4. logt je automatisch na een bepaalde periode van inactieviteit uit.
5. maakt de requests pagina niet beschikbaar voor degene die geen coach zijn.
6. geeft een 404 error pagina weer bij een niet erkende url route.
