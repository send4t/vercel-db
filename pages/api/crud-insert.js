const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("poems");
    const coll = db.collection("poe");

    // insert code goes here
    const docs = [
      {author:"Juhász Gyula",title:"Első szerelem",content:
      [
        "Egész szerelmem annyi volt csak:",
        "Hogy láttalak, szemedbe néztem,",
        "Egy mosolygásod volt csak minden,",
        "De nekem elég volt egészen.", 
        "És én úgy őrzöm e mosolygást",
        "Miként a napsugárt a tenger",
        "Elrejtve mélyen, szomorúan",
        "És - végtelen nagy szerelemmel. "]},
      {author:"Juhász Gyula",title:"Költők",content:"Vannak poéták, akik sohsem írnak,\nCsak a szívükben élnek költemények,\nValami nagy búbánat érte őket,\nS azóta lettek költőkké szegények.\n\nEgy szebb világnak épp úgy álmodói,\nRajongás őket éppen úgy hevíti,\nÉs éppen olyan szomorúk, lemondók,\nMint azok, akik - verset tudnak írni!"},
      {author:"Juhász Gyula",title:"Enyém az alkony",content:"Enyém az alkony. Kihunyó sugára,\nTéveteg, halovány árnya enyém.\nA rózsaszínű pirkadás világát\nSzegény elfáradt, meg nem értem én.\n\nEnyém az alkony. Reám veti leplét\nS nagy bánatommal egymagamra hagy.\n...Úgy bánt a hajnalhasadás az égen,\nA bíboros, a királyi arany!\n\nEnyém az alkony! Hadd vesse világát\nA támadó nap arra, aki kél,\nÉn álmodozzam csak elaluvóban\nA lehunyó nap gyér tüzeinél!"},
      {author:"Juhász Gyula",title:"Dalok vége",content:"Dalolni, dalolni!\nLobogó vágy éget;\nDalok büszke szárnyán\nMámorosan szállni\nÁt a mindenséget.\n\nDalolni, dalolni!\nHatalmas vágy ragad,\nÁlmok országában\nRévedezve járni\nTündéri tájakat!\n\nDalolni, dalolni!\nS szíved későn érzi,\nHogy a lobogásban,\nAz álomlátásban,\nElfelejtett - élni!"},
      {author:"Juhász Gyula",title:"Budapest",content:"A pirosszemű szörny vad törtetéssel\nAz óriás homályba berobog,\nMost készülődik a májusi éjjel,\nDe éjtől nem félnek a városok!\n\nÍme e homály is az üvegtetőkön\nVillámos fénnyel gyúl ki hirtelen,\nA pirosszemű szörny is visszahőköl\nÉs gőzpárát piheg félelmesen.\n\nMegindul a nagy törtetés, roham,\nMindenki ugrál és némán rohan,\nA paloták hívólag integetnek:\n\nSzáz földi fénye ég a pesti estnek.\nS minden utat halvány rózsásra fest\nA nagy, gyönyörű dáma: Budapest!"},
      {author:"Radnóti Miklós",title:"ARCKÉP",content:"Huszonkét éves vagyok. Így\nnézhetett ki ősszel Krisztus is\nennyi idősen; még nem volt\nszakálla, szőke volt és lányok\nálmodtak véle éjjelenként!"},
      {author:"Radnóti Miklós",title:"FÉRFINAPLÓ",content:"\nNapjaim tetején ülök, onnan\nlóg le a lábom, hajamon\nhófelhő kalapoz és szavaim\nmessze, kakastollak közt\nportverve menetelnek!\n\nMondják, hogy virrad a gödrök\nalján, füvek alatt csillogva\nlesnek a tücskök s napitta\npocsolyák helye lelkesedik\ndöngölő léptek után!\n\nTalán vihar jön, mert\nsimul halasodva a borz víz,\nszéttette a csönd lábát\naz út fölött és harcos\nzajokkal készül marakodni!\n\n1931\n\n"},
      {author:"Tóth Árpád",title:"Látomás",content:"Mint ezüst gyík villan setét mohákon\nAlakod úgy illan át hűs szobámon,\nHol ó csipkéktől bánatos az ablak,\nS hol szűk, kerek üvegkalitba zárva\nRéztrónusán gubbaszt a lámpám lángja,\nS rezzenve ijjedez, ha hívogatlak.\n \nMint a setét színpadra, akkor este,\nEzüstös apródként jössz most. Kezedre\nKaréjos csipke függ, csuklódon alván.\nS mintha szelíd Hamlet halálát látnád,\nSzemed úgy néz felém a szűk szobán át,\nS lágy szalagcsokor reszket térded alján.\n \nÓ, csak egy pillanatra jössz. Megállasz.\nBomló hajadban tétován babrálgatsz,\nMakacs fürtjét szemedről félrehajtva,\nS máris, sebten, a hűs falakba folysz át,\nS én nem tudom, milyen volt drága orcád,\nEmlékem petyhüdt, mint a holtak ajka.\n \nS egyszer majd végképp elfelejtem állad,\nS hogy ujjaim közt fogtam... s párnás vállad\nIllata emlékemből messzereszket...\nÉs mégis hívlak s várom, visszatérsz-e?\nMint hibbant agg, ki csillagokba nézne,\nS az égre könnyes, vak szemet meresztget.\n \n1909"},
      {author:"Amade László",title:"I. JUSSON EGYSZER MÉG ESZEDBEN...",content:"1.\nJusson egyszer még eszedben,\nKit metszettél bé szivedben?\nLégy hajlandó nevének,\nÖrökös hivségének.\n \n2.\nUgy ég érted, mint égő tüz,\nSzerelmében tiszta és szüz,\nKész parancsolatidra,\nÖrökös rabszijadra.\n \n3.\nLásd szegénynek aggódásit\nÉs ártatlan bánkodásit,\nSzánd szegénynek sérelmét,\nMost is véres sebeit.\n \n4.\nItéld meg, hogy nem vagy pogány,\nSem kőszikla s kemény márvány,\nKész engedelmességem,\nEngedelmes készségem.\n \n5.\nAmor, tudod, nem gyermekség!\nMégis Cupidótúl gyúl s ég:\nÉn is mindjárt szerettem,\nMihelyest csak születtem.\n \n6.\nNézz rám bár csak még egy izbe\nMint Pryamusra a Thisbe;\nDe mi haszna szeretnem?\nHa jutalma csak: nem! nem!\n \n7.\nNincs már más mód életemben,\nTe egyedül élsz szivemben,\nTe vagy lelke éltemnek,\nSzive meghólt testemnek.\n \n8.\nÁldott lészek, hogyha szeretsz,\nBoldogtalan, hogyha megvetsz,\nHiv szivedhez borúlok\nMár hallgatok s nem szóllok."},
      {author:"Zrínyi Miklós",title:"Atilla",content:"\n1. Isten haragjának én szelleti voltam,\nMikor ez világot fegyverrel nyargaltam,\nVércataractákat karddal árosztottam,\nÉs mint egy villámás, földet megfutottam.\n \n2. Én vagyok magyarnak legelső királyja,\nUtolsó világrészrül én kihozója!\nÉn lehetek tehát magyarnak példája,\nHirét s birodalmát hogy nyujtsa szablyája."},
      {author:"Virág Benedek",title:"A músákhoz",content:"Hová ragadtok? melly ligetek, s setét\nErnyőkbe visztek? mennyei lángotok\nÚj és szokatlan tűzbe hozta\n          Szívemet, oh Helikon leányi!\n \nItt e magános szent helyeken fogom\nMagyar Minervát zengeni lantomon.\nA halhatatlanság fiának\n          Érdemit itt fogom énekelni.\n \nTí, csendes erdők puszta homályai!\nTí, kis folyóknak víg csevegései!\nMelly kellemes, melly boldogító\n          Gondolatokra vezettek engem!\n \nMert a dicsőség Szűzei lakhelyet\nVertek magoknak bennetek. - Engedek\nSzent ihlelésteknek, s örömmel\n          Engedek, oh Helikon leányi!"}
    
    ];

    const result = await coll.insertMany(docs);

    // display the results of your operation
    console.log(result.insertedIds);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
