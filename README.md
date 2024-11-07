# Utvikleropptak: Nyhetsfeed-prosjekt
Velkommen til Propelys opptaksprøve for utviklere! I denne oppgaven skal du bygge en nyhetsfeed-applikasjon med React som frontend og en backend etter eget valg, gjerne Firebase Firestore eller en annen løsning. Oppgaven inkluderer både grunnleggende funksjonalitet og bonusoppgaver for videre utfordringer.

# Oppgavebeskrivelse
Målet med oppgaven er å bygge en enkel nyhetsfeed der brukere kan opprette innlegg. Hvert innlegg skal inneholde en tittel, innhold og et tidsstempel. I tillegg ønskes det at hver post viser brukerinformasjon, slik som brukernavn, profilbilde-URL og bruker-ID.

# Teknologikrav
### Frontend: 
React
### Backend: 
Firebase Firestore eller en annen valgt backend-løsning
### Validering:
Bruk gjerne Yup, React Hook Form eller lignende for input-validering
### Sanntidsoppdateringer: 
Bruk Firebase eller alternativ teknologi for live oppdateringer

# Hovedfunksjonalitet
## Innleggsfunksjonalitet: Lag en nyhetsfeed der brukere kan opprette innlegg med en tittel, innhold og et tidsstempel.

## Input-validering: 
Bruk et valideringsbibliotek (f.eks. Yup eller React Hook Form) for å sikre at tittelen har riktig lengde, at innholdet ikke er tomt, og at tidsstempelformatet er korrekt.

## Brukerinformasjon: 
Hvert innlegg skal inkludere brukerinformasjon, som brukernavn, profilbilde-URL og bruker-ID. Denne informasjonen kan lagres som underdokumenter i Firestore eller via en annen backend-struktur.

# Bonusoppgaver
Fullfør så mange av disse som mulig for ekstra poeng:

a. Backend-sikkerhet: Implementer sikkerhetsregler på backend som validerer innlegg før de lagres. Dette kan inkludere sjekk på at nødvendige felter er korrekt formatert.

b. Automatisk likes-felt: Opprett en funksjon på backend som automatisk setter likes: number til et tilfeldig tall mellom 0 og 10 når et nytt innlegg opprettes.

c. Sanntidsoppdateringer: Legg til støtte for sanntidsoppdateringer slik at oppdateringer vises direkte i flere åpne faner. Bruk Firebase sin sanntidssynkronisering, WebSockets eller en annen sanntidsløsning.

d. Branding: Tilpass designet til Propely ved å bruke selskapets farger i applikasjonen.

e. Kommentarfunksjonalitet: Utvid nyhetsfeeden ved å legge til kommentarfelt under hvert innlegg. Kommentarfeltet kan lagres som subcollections (f.eks. posts/{postId}/comments) i Firestore eller via en annen backend-struktur, og bør også oppdateres i sanntid.

f. Avanserte tilgangskontroller: Implementer tilgangskontroller i backend slik at kun autentiserte brukere kan legge til innlegg eller kommentarer. Valider at felter som user, timestamp og eventuelle subcollections er korrekte.

# Oppsett og Kjøring av Applikasjonen
Klon repoet:
```git clone https://github.com/propely/nyhetsfeed-prosjekt.git```
```cd nyhetsfeed-prosjekt```

Installer avhengigheter:
```npm install```

Legg til konfigurasjon for backend:

Firebase Firestore-brukere: Konfigurer Firebase og legg til din Firebase-konfigurasjonsfil i prosjektet.
Alternativ backend: Sett opp og konfigurer ønsket backend, og legg til konfigurasjonsdetaljer i prosjektet.

Start applikasjonen:
```npm start```

Applikasjonen vil være tilgjengelig på http://localhost:3000.

# Innsending
Kode: Last opp koden din til et offentlig GitHub-repo og send oss lenken.
Dokumentasjon: Legg ved en kort beskrivelse av hvordan du har løst oppgaven, inkludert valg av teknologi og eventuelle utfordringer du støtte på.
Vi ser frem til å se din løsning! Lykke til!
