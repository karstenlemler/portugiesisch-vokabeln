/* ============================================================
   Vokabeldaten — Europäisches Portugiesisch (pt-PT)
   Grundwortschatz A1 + A2, gegliedert in Lektionen
   ============================================================ */

const LESSONS = [
  /* ---------- A1 ---------- */
  { id: "a1-01", level: "A1", title: "Begrüßung & Höflichkeit",       emoji: "👋" },
  { id: "a1-02", level: "A1", title: "Zahlen 0–20",                   emoji: "🔢" },
  { id: "a1-03", level: "A1", title: "Zahlen 21–100",                 emoji: "💯" },
  { id: "a1-04", level: "A1", title: "Große Zahlen & Ordnungszahlen", emoji: "🔟" },
  { id: "a1-05", level: "A1", title: "Wochentage & Monate",           emoji: "📅" },
  { id: "a1-06", level: "A1", title: "Uhrzeit & Datum",               emoji: "⏰" },
  { id: "a1-07", level: "A1", title: "Farben & Formen",               emoji: "🎨" },
  { id: "a1-08", level: "A1", title: "Familie & Menschen",            emoji: "👨‍👩‍👧" },
  { id: "a1-09", level: "A1", title: "Persönliche Angaben & Länder",  emoji: "🌍" },
  { id: "a1-10", level: "A1", title: "Der Körper",                    emoji: "🧍" },
  { id: "a1-11", level: "A1", title: "Essen & Trinken",               emoji: "🍽️" },
  { id: "a1-12", level: "A1", title: "Im Restaurant & Café",          emoji: "☕" },
  { id: "a1-13", level: "A1", title: "Einkaufen & Geld",              emoji: "🛒" },
  { id: "a1-14", level: "A1", title: "Wohnen & Möbel",                emoji: "🏠" },
  { id: "a1-15", level: "A1", title: "In der Stadt",                  emoji: "🏙️" },
  { id: "a1-16", level: "A1", title: "Verkehr & Reisen",              emoji: "🚉" },
  { id: "a1-17", level: "A1", title: "Kleidung",                      emoji: "👕" },
  { id: "a1-18", level: "A1", title: "Wetter & Jahreszeiten",         emoji: "🌦️" },
  { id: "a1-19", level: "A1", title: "Beruf & Arbeit",                emoji: "💼" },
  { id: "a1-20", level: "A1", title: "Schule & Lernen",               emoji: "📚" },
  { id: "a1-21", level: "A1", title: "Freizeit & Hobbys",             emoji: "⚽" },
  { id: "a1-22", level: "A1", title: "Wichtige Verben I",             emoji: "🏃" },
  { id: "a1-23", level: "A1", title: "Wichtige Adjektive I",          emoji: "✨" },
  { id: "a1-24", level: "A1", title: "Fragewörter & kleine Wörter",   emoji: "❓" },
  { id: "a1-25", level: "A1", title: "Häufigkeit & Zeitangaben",      emoji: "🕐" },

  /* ---------- A2 ---------- */
  { id: "a2-01", level: "A2", title: "Gefühle & Charakter",           emoji: "😊" },
  { id: "a2-02", level: "A2", title: "Gesundheit & beim Arzt",        emoji: "🩺" },
  { id: "a2-03", level: "A2", title: "Wichtige Verben II",            emoji: "🏃" },
  { id: "a2-04", level: "A2", title: "Wichtige Adjektive II",         emoji: "✨" },
  { id: "a2-05", level: "A2", title: "Reisen & Urlaub",               emoji: "✈️" },
  { id: "a2-06", level: "A2", title: "Hotel & Unterkunft",            emoji: "🏨" },
  { id: "a2-07", level: "A2", title: "Arbeit & Büro",                 emoji: "🖥️" },
  { id: "a2-08", level: "A2", title: "Technik & Medien",              emoji: "📱" },
  { id: "a2-09", level: "A2", title: "Natur & Umwelt",                emoji: "🌳" },
  { id: "a2-10", level: "A2", title: "Tiere",                         emoji: "🐕" },
  { id: "a2-11", level: "A2", title: "Sport",                         emoji: "🏊" },
  { id: "a2-12", level: "A2", title: "Kultur & Ausgehen",             emoji: "🎭" },
  { id: "a2-13", level: "A2", title: "Feste & Traditionen",           emoji: "🎉" },
  { id: "a2-14", level: "A2", title: "Behörden & Dienstleistungen",   emoji: "🏛️" },
  { id: "a2-15", level: "A2", title: "Wohnung mieten & Haushalt",     emoji: "🧹" },
  { id: "a2-16", level: "A2", title: "Beziehungen & Gesellschaft",    emoji: "💬" },
  { id: "a2-17", level: "A2", title: "Verbindungswörter & Redemittel", emoji: "🔗" },
  { id: "a2-18", level: "A2", title: "Adverbien & Mengenangaben",     emoji: "📏" }
];

/* ---------- Zahlwörter (generiert) ---------- */
const ptOnes  = ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
const ptTeens = { 10: "dez", 11: "onze", 12: "doze", 13: "treze", 14: "catorze",
                  15: "quinze", 16: "dezasseis", 17: "dezassete", 18: "dezoito", 19: "dezanove" };
const ptTens  = { 20: "vinte", 30: "trinta", 40: "quarenta", 50: "cinquenta",
                  60: "sessenta", 70: "setenta", 80: "oitenta", 90: "noventa" };
function ptNumber(n) {
  if (n === 100) return "cem";
  if (n < 10) return ptOnes[n];
  if (n <= 19) return ptTeens[n];
  if (n % 10 === 0) return ptTens[n];
  return ptTens[Math.floor(n / 10) * 10] + " e " + ptOnes[n % 10];
}

const deOnes  = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
const deCmp   = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
const deTeens = { 10: "zehn", 11: "elf", 12: "zwölf", 13: "dreizehn", 14: "vierzehn",
                  15: "fünfzehn", 16: "sechzehn", 17: "siebzehn", 18: "achtzehn", 19: "neunzehn" };
const deTens  = { 20: "zwanzig", 30: "dreißig", 40: "vierzig", 50: "fünfzig",
                  60: "sechzig", 70: "siebzig", 80: "achtzig", 90: "neunzig" };
function deNumber(n) {
  if (n === 100) return "hundert";
  if (n < 10) return deOnes[n];
  if (n <= 19) return deTeens[n];
  if (n % 10 === 0) return deTens[n];
  return deCmp[n % 10] + "und" + deTens[Math.floor(n / 10) * 10];
}

function numberRange(from, to) {
  const out = [];
  for (let i = from; i <= to; i++) out.push([ptNumber(i), deNumber(i)]);
  return out;
}

/* ---------- Wörter je Lektion ---------- */
const WORDS = {

"a1-01": [
["olá","hallo"],["bom dia","guten Morgen"],["boa tarde","guten Tag / Nachmittag"],
["boa noite","guten Abend / gute Nacht"],["adeus","auf Wiedersehen"],["até logo","bis später"],
["até amanhã","bis morgen"],["até já","bis gleich"],["por favor","bitte"],
["obrigado / obrigada","danke"],["muito obrigado","vielen Dank"],["de nada","gern geschehen"],
["desculpe","Entschuldigung"],["com licença","Entschuldigung (darf ich vorbei)"],["sim","ja"],
["não","nein"],["talvez","vielleicht"],["como está?","wie geht es Ihnen?"],
["tudo bem?","alles gut?"],["muito prazer","sehr erfreut"],["bem-vindo","willkommen"],
["boa sorte","viel Glück"],["parabéns","herzlichen Glückwunsch"],["saúde","Gesundheit / Prost"],
["faz favor","bitte (Aufmerksamkeit erregen)"],["não faz mal","macht nichts"],
["com certeza","sicherlich"],["claro","klar"],["bom fim de semana","schönes Wochenende"],
["como se chama?","wie heißen Sie?"],["chamo-me","ich heiße"],["não percebo","ich verstehe nicht"],
["pode repetir?","können Sie das wiederholen?"],["fala alemão?","sprechen Sie Deutsch?"],
["mais devagar, por favor","langsamer, bitte"]
],

"a1-02": numberRange(0, 20),
"a1-03": numberRange(21, 100),

"a1-04": [
["duzentos","zweihundert"],["trezentos","dreihundert"],["quatrocentos","vierhundert"],
["quinhentos","fünfhundert"],["seiscentos","sechshundert"],["setecentos","siebenhundert"],
["oitocentos","achthundert"],["novecentos","neunhundert"],["mil","tausend"],
["um milhão","eine Million"],["o número","die Nummer / Zahl"],["primeiro","erste(r)"],
["segundo","zweite(r)"],["terceiro","dritte(r)"],["quarto","vierte(r)"],["quinto","fünfte(r)"],
["sexto","sechste(r)"],["sétimo","siebte(r)"],["oitavo","achte(r)"],["nono","neunte(r)"],
["décimo","zehnte(r)"],["último","letzte(r)"],["a metade","die Hälfte"],["o dobro","das Doppelte"],
["contar","zählen"]
],

"a1-05": [
["segunda-feira","Montag"],["terça-feira","Dienstag"],["quarta-feira","Mittwoch"],
["quinta-feira","Donnerstag"],["sexta-feira","Freitag"],["sábado","Samstag"],["domingo","Sonntag"],
["janeiro","Januar"],["fevereiro","Februar"],["março","März"],["abril","April"],["maio","Mai"],
["junho","Juni"],["julho","Juli"],["agosto","August"],["setembro","September"],
["outubro","Oktober"],["novembro","November"],["dezembro","Dezember"],
["o dia","der Tag"],["a semana","die Woche"],["o mês","der Monat"],["o ano","das Jahr"],
["o fim de semana","das Wochenende"],["hoje","heute"],["amanhã","morgen"],["ontem","gestern"],
["anteontem","vorgestern"],["depois de amanhã","übermorgen"]
],

"a1-06": [
["a hora","die Stunde / Uhrzeit"],["o minuto","die Minute"],["o segundo","die Sekunde"],
["o relógio","die Uhr"],["que horas são?","wie spät ist es?"],["o meio-dia","der Mittag"],
["a meia-noite","die Mitternacht"],["a manhã","der Morgen / Vormittag"],["a tarde","der Nachmittag"],
["a noite","der Abend / die Nacht"],["de manhã","morgens"],["à tarde","nachmittags"],
["à noite","abends"],["cedo","früh"],["tarde","spät"],["agora","jetzt"],
["o calendário","der Kalender"],["a data","das Datum"],["em ponto","Punkt (Uhr)"],
["e meia","halb (nach)"],["um quarto","Viertel"],["quanto tempo?","wie lange?"],
["a hora de ponta","die Stoßzeit"]
],

"a1-07": [
["vermelho","rot"],["azul","blau"],["verde","grün"],["amarelo","gelb"],["preto","schwarz"],
["branco","weiß"],["cor de laranja","orange"],["cor-de-rosa","rosa"],["castanho","braun"],
["cinzento","grau"],["roxo","lila / violett"],["claro","hell"],["escuro","dunkel"],
["a cor","die Farbe"],["o círculo","der Kreis"],["o quadrado","das Quadrat"],
["o triângulo","das Dreieck"],["a linha","die Linie"],["redondo","rund"],["colorido","bunt"]
],

"a1-08": [
["a família","die Familie"],["o pai","der Vater"],["a mãe","die Mutter"],["os pais","die Eltern"],
["o filho","der Sohn"],["a filha","die Tochter"],["o irmão","der Bruder"],["a irmã","die Schwester"],
["o avô","der Großvater"],["a avó","die Großmutter"],["os avós","die Großeltern"],
["o neto","der Enkel"],["a neta","die Enkelin"],["o tio","der Onkel"],["a tia","die Tante"],
["o primo","der Cousin"],["a prima","die Cousine"],["o sobrinho","der Neffe"],
["a sobrinha","die Nichte"],["o marido","der Ehemann"],["a esposa","die Ehefrau"],
["o homem","der Mann"],["a mulher","die Frau"],["a criança","das Kind"],["o bebé","das Baby"],
["o rapaz","der Junge"],["a rapariga","das Mädchen"],["o amigo","der Freund"],
["a amiga","die Freundin"],["o vizinho","der Nachbar"],["o namorado","der Freund (Partner)"],
["a namorada","die Freundin (Partnerin)"],["o senhor","der Herr"],["a senhora","die Dame"],
["as pessoas","die Leute"],["o casal","das Paar"],["o adulto","der Erwachsene"],
["o jovem","der Jugendliche"],["o nome","der Name"],["o apelido","der Nachname"]
],

"a1-09": [
["Portugal","Portugal"],["a Alemanha","Deutschland"],["a Espanha","Spanien"],["a França","Frankreich"],
["a Inglaterra","England"],["o Brasil","Brasilien"],["a Suíça","die Schweiz"],["a Áustria","Österreich"],
["a Itália","Italien"],["alemão","deutsch / Deutscher"],["português","portugiesisch / Portugiese"],
["o país","das Land"],["a cidade","die Stadt"],["a morada","die Adresse"],["a rua","die Straße"],
["o código postal","die Postleitzahl"],["a nacionalidade","die Staatsangehörigkeit"],
["a idade","das Alter"],["a língua","die Sprache"],["o passaporte","der Reisepass"],
["o bilhete de identidade","der Personalausweis"],["o número de telefone","die Telefonnummer"],
["o email","die E-Mail"],["solteiro","ledig"],["casado","verheiratet"],["nascer","geboren werden"],
["morar","wohnen"],["chamar-se","heißen"],["a assinatura","die Unterschrift"]
],

"a1-10": [
["o corpo","der Körper"],["a cabeça","der Kopf"],["o cabelo","das Haar"],["o olho","das Auge"],
["o nariz","die Nase"],["a boca","der Mund"],["a orelha","das Ohr"],["o dente","der Zahn"],
["o pescoço","der Hals"],["o braço","der Arm"],["a mão","die Hand"],["o dedo","der Finger"],
["a perna","das Bein"],["o pé","der Fuß"],["o joelho","das Knie"],["as costas","der Rücken"],
["a barriga","der Bauch"],["o coração","das Herz"],["o ombro","die Schulter"],["a cara","das Gesicht"],
["o sangue","das Blut"],["a pele","die Haut"],["o osso","der Knochen"]
],

"a1-11": [
["a comida","das Essen"],["a bebida","das Getränk"],["o pequeno-almoço","das Frühstück"],
["o almoço","das Mittagessen"],["o jantar","das Abendessen"],["o pão","das Brot"],
["o queijo","der Käse"],["o presunto","der Schinken"],["a manteiga","die Butter"],["o ovo","das Ei"],
["o leite","die Milch"],["o café","der Kaffee"],["o chá","der Tee"],["a água","das Wasser"],
["o sumo","der Saft"],["o vinho","der Wein"],["a cerveja","das Bier"],["a carne","das Fleisch"],
["o peixe","der Fisch"],["o frango","das Hähnchen"],["o arroz","der Reis"],["a batata","die Kartoffel"],
["a massa","die Nudeln"],["a sopa","die Suppe"],["a salada","der Salat"],["o legume","das Gemüse"],
["a fruta","das Obst"],["a maçã","der Apfel"],["a laranja","die Orange"],["a banana","die Banane"],
["o tomate","die Tomate"],["a cebola","die Zwiebel"],["o alho","der Knoblauch"],
["o açúcar","der Zucker"],["o sal","das Salz"],["a pimenta","der Pfeffer"],
["o azeite","das Olivenöl"],["o bolo","der Kuchen"],["o gelado","das Eis"],
["o chocolate","die Schokolade"],["comer","essen"],["beber","trinken"],["cozinhar","kochen"],
["ter fome","Hunger haben"],["ter sede","Durst haben"],["o bacalhau","der Stockfisch"]
],

"a1-12": [
["o restaurante","das Restaurant"],["o café","das Café"],["a ementa","die Speisekarte"],
["a conta","die Rechnung"],["o empregado de mesa","der Kellner"],["a mesa","der Tisch"],
["a cadeira","der Stuhl"],["o prato","der Teller / das Gericht"],["o copo","das Glas"],
["a chávena","die Tasse"],["o garfo","die Gabel"],["a faca","das Messer"],["a colher","der Löffel"],
["o guardanapo","die Serviette"],["a entrada","die Vorspeise"],["a sobremesa","der Nachtisch"],
["a gorjeta","das Trinkgeld"],["reservar","reservieren"],["pedir","bestellen"],["pagar","bezahlen"],
["a bica","der Espresso"],["o galão","der Milchkaffee"],["saboroso","lecker"],
["a garrafa","die Flasche"],["o pequeno-almoço incluído","Frühstück inklusive"]
],

"a1-13": [
["a loja","der Laden"],["o supermercado","der Supermarkt"],["o mercado","der Markt"],
["a padaria","die Bäckerei"],["o talho","die Metzgerei"],["a farmácia","die Apotheke"],
["o dinheiro","das Geld"],["o euro","der Euro"],["o preço","der Preis"],["caro","teuer"],
["barato","billig"],["o troco","das Wechselgeld"],["o cartão","die Karte"],["a nota","der Geldschein"],
["a moeda","die Münze"],["o saco","die Tüte"],["comprar","kaufen"],["vender","verkaufen"],
["custar","kosten"],["a promoção","das Sonderangebot"],["o desconto","der Rabatt"],
["o recibo","der Kassenbon"],["quanto custa?","was kostet das?"],["o cliente","der Kunde"],
["a caixa","die Kasse"]
],

"a1-14": [
["a casa","das Haus"],["o apartamento","die Wohnung"],["o quarto","das Zimmer / Schlafzimmer"],
["a sala","das Wohnzimmer"],["a cozinha","die Küche"],["a casa de banho","das Badezimmer"],
["o corredor","der Flur"],["a varanda","der Balkon"],["o jardim","der Garten"],
["a garagem","die Garage"],["a porta","die Tür"],["a janela","das Fenster"],["a parede","die Wand"],
["o chão","der Boden"],["o teto","die Decke"],["as escadas","die Treppe"],["o elevador","der Aufzug"],
["a cama","das Bett"],["o sofá","das Sofa"],["o armário","der Schrank"],["a estante","das Regal"],
["o candeeiro","die Lampe"],["o espelho","der Spiegel"],["o frigorífico","der Kühlschrank"],
["o fogão","der Herd"],["a máquina de lavar","die Waschmaschine"],["a chave","der Schlüssel"],
["o andar","das Stockwerk"],["o tapete","der Teppich"]
],

"a1-15": [
["a aldeia","das Dorf"],["a praça","der Platz"],["a avenida","die Allee"],["o centro","das Zentrum"],
["a igreja","die Kirche"],["o museu","das Museum"],["o hospital","das Krankenhaus"],
["a escola","die Schule"],["o banco","die Bank"],["os correios","die Post"],["a estação","der Bahnhof"],
["o aeroporto","der Flughafen"],["o parque","der Park"],["a ponte","die Brücke"],
["o hotel","das Hotel"],["o cinema","das Kino"],["o teatro","das Theater"],
["a biblioteca","die Bibliothek"],["a praia","der Strand"],["o rio","der Fluss"],["o mar","das Meer"],
["a esquina","die Ecke"],["o semáforo","die Ampel"],["o edifício","das Gebäude"],
["a paragem","die Haltestelle"],["a livraria","die Buchhandlung"]
],

"a1-16": [
["o carro","das Auto"],["o autocarro","der Bus"],["o comboio","der Zug"],["o metro","die U-Bahn"],
["o elétrico","die Straßenbahn"],["o avião","das Flugzeug"],["o barco","das Boot / Schiff"],
["a bicicleta","das Fahrrad"],["a mota","das Motorrad"],["o táxi","das Taxi"],
["o bilhete","die Fahrkarte"],["a viagem","die Reise"],["a partida","die Abfahrt"],
["a chegada","die Ankunft"],["o horário","der Fahrplan"],["a mala","der Koffer"],["o mapa","die Karte"],
["a estrada","die Landstraße"],["a autoestrada","die Autobahn"],["conduzir","fahren (lenken)"],
["viajar","reisen"],["apanhar","nehmen (Bus etc.)"],["o passageiro","der Fahrgast"],
["a gasolina","das Benzin"],["o atraso","die Verspätung"],["esquerda","links"],["direita","rechts"],
["em frente","geradeaus"],["perto","nah"],["longe","weit"]
],

"a1-17": [
["a roupa","die Kleidung"],["a camisa","das Hemd"],["a camisola","der Pullover"],
["a t-shirt","das T-Shirt"],["as calças","die Hose"],["os calções","die Shorts"],["a saia","der Rock"],
["o vestido","das Kleid"],["o casaco","die Jacke / der Mantel"],["o fato","der Anzug"],
["os sapatos","die Schuhe"],["as meias","die Socken"],["o chapéu","der Hut"],["o cinto","der Gürtel"],
["os óculos","die Brille"],["a mala de mão","die Handtasche"],["o tamanho","die Größe"],
["vestir","anziehen"],["despir","ausziehen"],["provar","anprobieren"],["o botão","der Knopf"],
["o guarda-chuva","der Regenschirm"]
],

"a1-18": [
["o tempo","das Wetter"],["o sol","die Sonne"],["a chuva","der Regen"],["a neve","der Schnee"],
["o vento","der Wind"],["a nuvem","die Wolke"],["a trovoada","das Gewitter"],
["o nevoeiro","der Nebel"],["a temperatura","die Temperatur"],["o grau","das Grad"],
["quente","heiß / warm"],["frio","kalt"],["faz sol","es ist sonnig"],["está a chover","es regnet"],
["a primavera","der Frühling"],["o verão","der Sommer"],["o outono","der Herbst"],
["o inverno","der Winter"],["a estação do ano","die Jahreszeit"],["o céu","der Himmel"],
["húmido","feucht"],["seco","trocken"]
],

"a1-19": [
["o trabalho","die Arbeit"],["a profissão","der Beruf"],["o emprego","die Stelle"],
["o médico","der Arzt"],["o enfermeiro","der Krankenpfleger"],["o professor","der Lehrer"],
["o aluno","der Schüler"],["o engenheiro","der Ingenieur"],["o advogado","der Rechtsanwalt"],
["o cozinheiro","der Koch"],["o motorista","der Fahrer"],["o polícia","der Polizist"],
["o vendedor","der Verkäufer"],["o empregado","der Angestellte"],["o chefe","der Chef"],
["o escritório","das Büro"],["a empresa","die Firma"],["a reunião","die Besprechung"],
["o salário","das Gehalt"],["trabalhar","arbeiten"],["reformado","pensioniert"],
["desempregado","arbeitslos"],["o agricultor","der Landwirt"],["o pintor","der Maler"],
["o eletricista","der Elektriker"]
],

"a1-20": [
["a universidade","die Universität"],["a aula","der Unterricht"],["o curso","der Kurs"],
["o livro","das Buch"],["o caderno","das Heft"],["a caneta","der Kugelschreiber"],
["o lápis","der Bleistift"],["a borracha","der Radiergummi"],["a mochila","der Rucksack"],
["o quadro","die Tafel"],["o exame","die Prüfung"],["o exercício","die Übung"],
["a pergunta","die Frage"],["a resposta","die Antwort"],["a palavra","das Wort"],
["a frase","der Satz"],["o dicionário","das Wörterbuch"],["aprender","lernen"],
["ensinar","unterrichten"],["estudar","studieren / lernen"],["escrever","schreiben"],["ler","lesen"],
["repetir","wiederholen"],["a nota","die Note"],["o erro","der Fehler"],
["o trabalho de casa","die Hausaufgabe"],["a gramática","die Grammatik"]
],

"a1-21": [
["o tempo livre","die Freizeit"],["o passatempo","das Hobby"],["a música","die Musik"],
["o filme","der Film"],["o desporto","der Sport"],["o jogo","das Spiel"],["a festa","die Party"],
["a televisão","das Fernsehen"],["o computador","der Computer"],["a fotografia","das Foto"],
["a dança","der Tanz"],["o concerto","das Konzert"],["nadar","schwimmen"],["correr","laufen"],
["dançar","tanzen"],["cantar","singen"],["jogar","spielen (Spiel)"],["tocar","spielen (Instrument)"],
["ouvir","hören"],["passear","spazieren gehen"],["descansar","sich ausruhen"],
["divertir-se","sich amüsieren"],["viajar de férias","in den Urlaub fahren"],["pescar","angeln"]
],

"a1-22": [
["ser","sein (dauerhaft)"],["estar","sein (Zustand)"],["ter","haben"],["fazer","machen"],
["ir","gehen / fahren"],["vir","kommen"],["querer","wollen"],["poder","können"],
["dever","sollen / müssen"],["saber","wissen / können"],["dizer","sagen"],["falar","sprechen"],
["ver","sehen"],["dar","geben"],["ficar","bleiben"],["haver","es gibt"],
["pôr","setzen / stellen / legen"],["levar","mitnehmen"],["trazer","mitbringen"],["abrir","öffnen"],
["fechar","schließen"],["começar","anfangen"],["acabar","beenden"],["esperar","warten / hoffen"],
["precisar","brauchen"],["gostar","mögen"],["ajudar","helfen"],["procurar","suchen"],
["encontrar","finden"],["entrar","eintreten"],["sair","hinausgehen"],["chegar","ankommen"],
["partir","abfahren"],["andar","gehen / laufen"],["dormir","schlafen"],["acordar","aufwachen"],
["tomar","nehmen"],["usar","benutzen"],["mostrar","zeigen"],["perguntar","fragen"],
["responder","antworten"],["entender","verstehen"],["conhecer","kennen"],["viver","leben"],
["morrer","sterben"],["comprar","einkaufen"]
],

"a1-23": [
["bom","gut"],["mau","schlecht"],["grande","groß"],["pequeno","klein"],["novo","neu / jung"],
["velho","alt"],["jovem","jung"],["alto","hoch / groß"],["baixo","niedrig / klein"],["longo","lang"],
["curto","kurz"],["fácil","einfach"],["difícil","schwierig"],["bonito","schön"],["feio","hässlich"],
["rápido","schnell"],["lento","langsam"],["forte","stark"],["fraco","schwach"],["limpo","sauber"],
["sujo","schmutzig"],["cheio","voll"],["vazio","leer"],["aberto","offen"],["fechado","geschlossen"],
["certo","richtig"],["errado","falsch"],["contente","zufrieden"],["triste","traurig"],
["cansado","müde"],["doente","krank"],["livre","frei"],["ocupado","besetzt / beschäftigt"],
["importante","wichtig"],["quente","warm"],["primeiro","erster"]
],

"a1-24": [
["que","was"],["quem","wer"],["onde","wo"],["quando","wann"],["como","wie"],["porquê","warum"],
["porque","weil"],["quanto","wie viel"],["qual","welcher"],["e","und"],["ou","oder"],["mas","aber"],
["também","auch"],["muito","sehr / viel"],["pouco","wenig"],["mais","mehr"],["menos","weniger"],
["com","mit"],["sem","ohne"],["para","für / nach"],["de","von / aus"],["em","in"],["sobre","über"],
["entre","zwischen"],["até","bis"],["depois","nach / danach"],["antes","vor / vorher"],
["aqui","hier"],["ali","dort"],["tudo","alles"],["nada","nichts"],["alguém","jemand"],
["ninguém","niemand"],["sempre","immer"],["nunca","nie"],["já","schon"],["ainda","noch"],
["só","nur"],["todos","alle"],["contra","gegen"]
],

"a1-25": [
["às vezes","manchmal"],["frequentemente","häufig"],["raramente","selten"],
["normalmente","normalerweise"],["todos os dias","jeden Tag"],["uma vez","einmal"],
["duas vezes","zweimal"],["de vez em quando","ab und zu"],["outra vez","nochmal"],
["finalmente","endlich"],["durante","während"],["desde","seit"],["há","vor (zeitlich)"],
["dentro de","innerhalb von"],["logo","gleich"],["ainda não","noch nicht"],["já não","nicht mehr"],
["o momento","der Moment"],["o início","der Anfang"],["o fim","das Ende"],["próximo","nächster"],
["passado","vergangen"],["atual","aktuell"],["hoje em dia","heutzutage"],["por enquanto","vorerst"],
["a partir de","ab"]
],

/* ================= A2 ================= */

"a2-01": [
["o sentimento","das Gefühl"],["feliz","glücklich"],["infeliz","unglücklich"],["alegre","fröhlich"],
["zangado","wütend"],["nervoso","nervös"],["calmo","ruhig"],["preocupado","besorgt"],
["surpreendido","überrascht"],["orgulhoso","stolz"],["envergonhado","peinlich berührt"],
["o medo","die Angst"],["a alegria","die Freude"],["a tristeza","die Traurigkeit"],
["a raiva","die Wut"],["a saudade","die Sehnsucht"],["simpático","sympathisch"],
["antipático","unsympathisch"],["amável","freundlich"],["generoso","großzügig"],
["egoísta","egoistisch"],["tímido","schüchtern"],["inteligente","intelligent"],
["engraçado","lustig"],["sério","ernst"],["honesto","ehrlich"],["paciente","geduldig"],
["teimoso","stur"],["trabalhador","fleißig"],["preguiçoso","faul"],["o carácter","der Charakter"],
["apaixonar-se","sich verlieben"],["o amor","die Liebe"],["o ciúme","die Eifersucht"],
["sentir","fühlen"],["rir","lachen"],["chorar","weinen"],["sorrir","lächeln"]
],

"a2-02": [
["a saúde","die Gesundheit"],["a doença","die Krankheit"],["o consultório","die Arztpraxis"],
["a consulta","der Arzttermin"],["a dor","der Schmerz"],["a dor de cabeça","die Kopfschmerzen"],
["a febre","das Fieber"],["a constipação","die Erkältung"],["a gripe","die Grippe"],
["a tosse","der Husten"],["o remédio","das Medikament"],["o comprimido","die Tablette"],
["a receita","das Rezept"],["a injeção","die Spritze"],["o seguro de saúde","die Krankenversicherung"],
["a urgência","die Notaufnahme"],["o acidente","der Unfall"],["a ferida","die Wunde"],
["o dentista","der Zahnarzt"],["doer","wehtun"],["tratar","behandeln"],["curar","heilen"],
["saudável","gesund"],["grávida","schwanger"],["a alergia","die Allergie"],
["sentir-se mal","sich schlecht fühlen"],["a ambulância","der Krankenwagen"],
["respirar","atmen"],["descansar na cama","im Bett bleiben"]
],

"a2-03": [
["acontecer","geschehen"],["achar","meinen / finden"],["pensar","denken"],
["lembrar-se","sich erinnern"],["esquecer","vergessen"],["decidir","entscheiden"],
["escolher","wählen"],["tentar","versuchen"],["conseguir","schaffen"],["receber","bekommen"],
["enviar","senden"],["mudar","ändern"],["melhorar","verbessern"],["crescer","wachsen"],
["perder","verlieren"],["ganhar","gewinnen / verdienen"],["gastar","ausgeben"],["poupar","sparen"],
["emprestar","leihen"],["devolver","zurückgeben"],["guardar","aufbewahren"],["deixar","lassen"],
["parar","anhalten"],["continuar","fortfahren"],["seguir","folgen"],["subir","hinaufgehen"],
["descer","hinuntergehen"],["cair","fallen"],["atirar","werfen"],["puxar","ziehen"],
["empurrar","schieben"],["apagar","löschen"],["acender","anzünden / einschalten"],
["ligar","anrufen / einschalten"],["desligar","ausschalten"],["construir","bauen"],
["reparar","reparieren"],["limpar","putzen"],["lavar","waschen"],["arrumar","aufräumen"],
["cortar","schneiden"],["proibir","verbieten"],["permitir","erlauben"],["explicar","erklären"],
["significar","bedeuten"],["acreditar","glauben"],["duvidar","zweifeln"],["combinar","vereinbaren"],
["apresentar","vorstellen"],["evitar","vermeiden"]
],

"a2-04": [
["possível","möglich"],["impossível","unmöglich"],["necessário","notwendig"],
["perigoso","gefährlich"],["seguro","sicher"],["famoso","berühmt"],["estranho","seltsam"],
["normal","normal"],["diferente","verschieden"],["igual","gleich"],["parecido","ähnlich"],
["próprio","eigen"],["público","öffentlich"],["privado","privat"],["moderno","modern"],
["antigo","alt / antik"],["natural","natürlich"],["artificial","künstlich"],["rico","reich"],
["pobre","arm"],["gordo","dick"],["magro","dünn"],["duro","hart"],["mole","weich"],
["pesado","schwer"],["leve","leicht"],["profundo","tief"],["estreito","eng"],["largo","breit"],
["barulhento","laut"],["silencioso","leise"],["agradável","angenehm"],
["desagradável","unangenehm"],["interessante","interessant"],["aborrecido","langweilig"],
["maravilhoso","wunderbar"],["terrível","schrecklich"],["suficiente","ausreichend"],
["completo","vollständig"],["disponível","verfügbar"]
],

"a2-05": [
["as férias","der Urlaub"],["o turismo","der Tourismus"],["o turista","der Tourist"],
["a excursão","der Ausflug"],["o guia","der Reiseführer"],["a fronteira","die Grenze"],
["o estrangeiro","das Ausland"],["a bagagem","das Gepäck"],["o voo","der Flug"],
["a companhia aérea","die Fluggesellschaft"],["o cartão de embarque","die Bordkarte"],
["a alfândega","der Zoll"],["o visto","das Visum"],["a reserva","die Reservierung"],
["a paisagem","die Landschaft"],["o monumento","das Denkmal"],["o miradouro","der Aussichtspunkt"],
["a lembrança","das Souvenir"],["alugar","mieten"],["visitar","besuchen"],
["descobrir","entdecken"],["o passeio","der Spaziergang / Ausflug"],
["a viagem de negócios","die Geschäftsreise"],["o campismo","das Camping"]
],

"a2-06": [
["a pousada","die Herberge"],["o quarto duplo","das Doppelzimmer"],
["o quarto individual","das Einzelzimmer"],["a receção","die Rezeption"],["o hóspede","der Gast"],
["a piscina","der Swimmingpool"],["o ar condicionado","die Klimaanlage"],
["o aquecimento","die Heizung"],["a toalha","das Handtuch"],["o lençol","das Bettlaken"],
["a almofada","das Kissen"],["o cobertor","die Decke"],["o duche","die Dusche"],
["a banheira","die Badewanne"],["o sabonete","die Seife"],["a limpeza","die Reinigung"],
["fazer o check-in","einchecken"],["a vista","die Aussicht"],["a diária","der Tagespreis"],
["o rés do chão","das Erdgeschoss"],["a estadia","der Aufenthalt"]
],

"a2-07": [
["o contrato","der Vertrag"],["o currículo","der Lebenslauf"],
["a entrevista","das Vorstellungsgespräch"],["a candidatura","die Bewerbung"],
["o colega","der Kollege"],["a equipa","das Team"],["o projeto","das Projekt"],["o prazo","die Frist"],
["a tarefa","die Aufgabe"],["o relatório","der Bericht"],["a impressora","der Drucker"],
["o documento","das Dokument"],["a pasta","der Ordner"],["a secretária","der Schreibtisch"],
["a formação","die Ausbildung"],["a experiência","die Erfahrung"],["o estágio","das Praktikum"],
["as horas extra","die Überstunden"],["a promoção","die Beförderung"],["despedir","entlassen"],
["contratar","einstellen"],["assinar","unterschreiben"],["organizar","organisieren"],
["a fatura","die Rechnung"],["o imposto","die Steuer"],["o cliente habitual","der Stammkunde"]
],

"a2-08": [
["o telemóvel","das Handy"],["o portátil","der Laptop"],["o ecrã","der Bildschirm"],
["o teclado","die Tastatur"],["o rato","die Maus (Computer)"],["a internet","das Internet"],
["o site","die Website"],["a palavra-passe","das Passwort"],["a mensagem","die Nachricht"],
["a aplicação","die App"],["o ficheiro","die Datei"],["descarregar","herunterladen"],
["gravar","speichern"],["imprimir","drucken"],["navegar","surfen"],
["as redes sociais","die sozialen Netzwerke"],["o jornal","die Zeitung"],
["a revista","die Zeitschrift"],["a notícia","die Nachricht (Presse)"],["o canal","der Sender"],
["o programa","die Sendung"],["a publicidade","die Werbung"],["o telejornal","die Tagesschau"],
["a câmara","die Kamera"],["o carregador","das Ladegerät"],["a bateria","der Akku"],
["avariado","kaputt"],["funcionar","funktionieren"]
],

"a2-09": [
["a natureza","die Natur"],["o ambiente","die Umwelt"],["a árvore","der Baum"],["a flor","die Blume"],
["a planta","die Pflanze"],["a folha","das Blatt"],["a erva","das Gras"],["a floresta","der Wald"],
["a montanha","der Berg"],["o vale","das Tal"],["o lago","der See"],["a ilha","die Insel"],
["a pedra","der Stein"],["a areia","der Sand"],["a terra","die Erde"],["o fogo","das Feuer"],
["o ar","die Luft"],["a poluição","die Verschmutzung"],["a reciclagem","das Recycling"],
["a energia","die Energie"],["proteger","schützen"],["poluir","verschmutzen"],["o clima","das Klima"],
["a estrela","der Stern"],["a lua","der Mond"],["o campo","das Land / Feld"],
["a costa","die Küste"],["a onda","die Welle"]
],

"a2-10": [
["o animal","das Tier"],["o cão","der Hund"],["o gato","die Katze"],["o cavalo","das Pferd"],
["a vaca","die Kuh"],["o porco","das Schwein"],["a ovelha","das Schaf"],["a galinha","das Huhn"],
["o pássaro","der Vogel"],["o coelho","das Kaninchen"],["o leão","der Löwe"],["o urso","der Bär"],
["o macaco","der Affe"],["a cobra","die Schlange"],["a aranha","die Spinne"],["a abelha","die Biene"],
["a mosca","die Fliege"],["o mosquito","die Mücke"],["a borboleta","der Schmetterling"],
["o burro","der Esel"],["a cauda","der Schwanz"],["a asa","der Flügel"],["morder","beißen"],
["voar","fliegen"],["o veterinário","der Tierarzt"],["a gaivota","die Möwe"]
],

"a2-11": [
["o futebol","der Fußball"],["o basquetebol","der Basketball"],["o ténis","das Tennis"],
["a natação","das Schwimmen"],["o ciclismo","das Radfahren"],["a corrida","das Rennen"],
["o ginásio","das Fitnessstudio"],["o jogador","der Spieler"],["o treinador","der Trainer"],
["o árbitro","der Schiedsrichter"],["o golo","das Tor"],["o campo","das Spielfeld"],
["o campeonato","die Meisterschaft"],["a vitória","der Sieg"],["a derrota","die Niederlage"],
["o empate","das Unentschieden"],["treinar","trainieren"],["vencer","gewinnen"],
["marcar","ein Tor schießen"],["a bola","der Ball"],["o estádio","das Stadion"],["o adepto","der Fan"],
["esquiar","Ski fahren"],["o guarda-redes","der Torwart"]
],

"a2-12": [
["a cultura","die Kultur"],["a arte","die Kunst"],["o quadro","das Gemälde"],
["a exposição","die Ausstellung"],["o artista","der Künstler"],["o espetáculo","die Vorstellung"],
["a peça","das Theaterstück"],["o ator","der Schauspieler"],["o realizador","der Regisseur"],
["a banda","die Band"],["o cantor","der Sänger"],["a canção","das Lied"],
["o instrumento","das Instrument"],["a guitarra","die Gitarre"],["o piano","das Klavier"],
["o fado","der Fado"],["a discoteca","die Diskothek"],["o bar","die Bar"],["a entrada","der Eintritt"],
["a fila","die Warteschlange"],["o público","das Publikum"],["aplaudir","applaudieren"],
["o romance","der Roman"],["o autor","der Autor"],["a história","die Geschichte"]
],

"a2-13": [
["o Natal","Weihnachten"],["a Páscoa","Ostern"],["o Ano Novo","Neujahr"],
["o aniversário","der Geburtstag"],["o casamento","die Hochzeit"],["o batizado","die Taufe"],
["o funeral","die Beerdigung"],["o feriado","der Feiertag"],["a tradição","die Tradition"],
["o costume","der Brauch"],["o presente","das Geschenk"],["o convite","die Einladung"],
["festejar","feiern"],["convidar","einladen"],["o santo","der Heilige"],
["a procissão","die Prozession"],["o fogo de artifício","das Feuerwerk"],
["os Santos Populares","die Volksheiligenfeste"],["brindar","anstoßen"],["a sardinha","die Sardine"],
["o Carnaval","der Karneval"],["a prenda","das Geschenk"]
],

"a2-14": [
["a câmara municipal","das Rathaus"],["as finanças","das Finanzamt"],["o funcionário","der Beamte"],
["o formulário","das Formular"],["o carimbo","der Stempel"],["a certidão","die Urkunde"],
["o número de contribuinte","die Steuernummer"],["a esquadra","die Polizeiwache"],
["o tribunal","das Gericht"],["a embaixada","die Botschaft"],["o consulado","das Konsulat"],
["a autorização","die Genehmigung"],["a multa","das Bußgeld"],["a lei","das Gesetz"],
["o direito","das Recht"],["o dever","die Pflicht"],["preencher","ausfüllen"],
["entregar","abgeben"],["o atendimento","die Bedienung / der Service"],
["a senha","die Wartenummer"],["o balcão","der Schalter"],["a taxa","die Gebühr"]
],

"a2-15": [
["a renda","die Miete"],["o senhorio","der Vermieter"],["o inquilino","der Mieter"],
["o contrato de arrendamento","der Mietvertrag"],["a caução","die Kaution"],
["as despesas","die Nebenkosten"],["a eletricidade","der Strom"],["o gás","das Gas"],
["o condomínio","die Hausverwaltung"],["mobilado","möbliert"],["a mudança","der Umzug"],
["o aspirador","der Staubsauger"],["a vassoura","der Besen"],["o detergente","das Spülmittel"],
["o lixo","der Müll"],["a louça","das Geschirr"],["passar a ferro","bügeln"],["varrer","fegen"],
["o estendal","die Wäscheleine"],["a torneira","der Wasserhahn"],["o cano","das Rohr"],
["a avaria","der Defekt"],["o vizinho do lado","der Nachbar nebenan"]
],

"a2-16": [
["a sociedade","die Gesellschaft"],["a relação","die Beziehung"],["a amizade","die Freundschaft"],
["o conhecido","der Bekannte"],["o encontro","das Treffen"],["a discussão","die Diskussion"],
["o problema","das Problem"],["a solução","die Lösung"],["a opinião","die Meinung"],
["o conselho","der Rat"],["a ajuda","die Hilfe"],["o favor","der Gefallen"],
["a confiança","das Vertrauen"],["o respeito","der Respekt"],["a diferença","der Unterschied"],
["concordar","zustimmen"],["discordar","widersprechen"],["discutir","streiten"],
["apoiar","unterstützen"],["confiar","vertrauen"],["o compromisso","die Verpflichtung"],
["a promessa","das Versprechen"],["casar-se","heiraten"],["divorciar-se","sich scheiden lassen"],
["separar-se","sich trennen"],["a geração","die Generation"],["a população","die Bevölkerung"],
["o estrangeiro","der Ausländer"]
],

"a2-17": [
["por isso","deshalb"],["por exemplo","zum Beispiel"],["além disso","außerdem"],
["no entanto","jedoch"],["apesar de","trotz"],["em vez de","anstatt"],["por causa de","wegen"],
["de facto","tatsächlich"],["na verdade","eigentlich"],["se calhar","vielleicht"],
["claro que sim","natürlich ja"],["acho que","ich glaube, dass"],
["na minha opinião","meiner Meinung nach"],["por um lado","einerseits"],
["por outro lado","andererseits"],["em primeiro lugar","erstens"],["ou seja","das heißt"],
["quer dizer","das bedeutet"],["de qualquer forma","jedenfalls"],["pelo contrário","im Gegenteil"],
["tanto como","sowohl als auch"],["nem nem","weder noch"],["enquanto","während"],
["embora","obwohl"],["para que","damit"],["caso","falls"],["assim que","sobald"],
["desde que","vorausgesetzt"],["sobretudo","vor allem"],["ao mesmo tempo","gleichzeitig"]
],

"a2-18": [
["bastante","ziemlich"],["demasiado","zu viel"],["quase","fast"],["apenas","nur / lediglich"],
["especialmente","besonders"],["provavelmente","wahrscheinlich"],["certamente","sicherlich"],
["felizmente","glücklicherweise"],["infelizmente","leider"],["rapidamente","schnell"],
["lentamente","langsam"],["facilmente","leicht"],["juntos","zusammen"],["sozinho","allein"],
["de repente","plötzlich"],["devagar","langsam"],["depressa","schnell"],["o quilo","das Kilo"],
["o grama","das Gramm"],["o litro","der Liter"],["o metro","der Meter"],
["o quilómetro","der Kilometer"],["a dúzia","das Dutzend"],["a fatia","die Scheibe"],
["o pedaço","das Stück"],["a caixa","die Schachtel"],["o pacote","die Packung"],
["o par","das Paar"],["vários","mehrere"],["alguns","einige"],["cada","jeder"],["ambos","beide"],
["o resto","der Rest"],["a maioria","die Mehrheit"]
]

};

/* ---------- Flache Vokabelliste aufbauen ---------- */
const vocab = [];
LESSONS.forEach(lesson => {
  (WORDS[lesson.id] || []).forEach(([pt, de]) => {
    vocab.push({ pt, de, lesson: lesson.id, level: lesson.level });
  });
});

// Lektionsnummern je Stufe vergeben + Wortzahl merken
(() => {
  const counters = {};
  LESSONS.forEach(l => {
    counters[l.level] = (counters[l.level] || 0) + 1;
    l.nr = counters[l.level];
    l.count = (WORDS[l.id] || []).length;
  });
})();

const LESSON_BY_ID = {};
LESSONS.forEach(l => { LESSON_BY_ID[l.id] = l; });
