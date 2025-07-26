# Kloniranje projekta i neophodne postavke
 
- Klonirati repozitorijum komandom git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-podcast_2020_0244.git na željenu destinaciju na vašem računaru
- Pokrenuti Sql server
- U željenom tekstualnom editoru otvoriti klonirani projekat (preporuka VSCode)
 
# Pokretanje Laravel API-ja
 
- Pozicionirati se u back folder komandom `cd back`
- Instalirati composer komandom `composer install`
- Kreirati .env fajl u root-u back projekta i podesiti informacije o konekciji sa bazom: DB_PORT, DB_USERNAME, DB_PASSWORD, DB_HOST
- Popuniti bazu podacima komandom `php artisan migrate:fresh --seed`
- Pokrenuti aplikaciju komandom `php artisan serve`
 
# Pokretanje React aplikacije - domaci
 
- Pozicionirati se u front_domaci folder komandom `cd front_domaci` (Neophodno je prvo pozicionirati se u root direktorijum komandom `cd ..`)
- Komandom `npm install` ( ili `npm i`), instalirati neophodne pakete za pokretanje same aplikacije
- Pokrenuti aplikaciju komandom `npm start`

# Pokretanje React aplikacije - projekat
 
- Pozicionirati se u front_projekat folder komandom `cd front_projekat` (Neophodno je prvo pozicionirati se u root direktorijum komandom `cd ..`)
- Komandom `npm install` ( ili `npm i`), instalirati neophodne pakete za pokretanje same aplikacije
- Pokrenuti aplikaciju komandom `npm start`
