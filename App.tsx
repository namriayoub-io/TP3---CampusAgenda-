import {Text,View,FlatList,StyleSheet} from 'react-native';
type Evenement = {
  id : string,
  titre : string,
  categorie : string,
  capacite : number,
  inscrits : number,
};
const evenements : Evenement[] = [
  {id : 'E01',titre:'Atelier React',categorie:'Atelier',capacite : 25,inscrits :25},
  {id : 'E02',titre:'Conference IA',categorie:'conference',capacite : 70,inscrits :52},
  {id : 'E03',titre:'Securite mobile',categorie:'Atelier',capacite : 20,inscrits :17},
  {id : 'E04',titre:'Design Ui',categorie:'Atelier',capacite : 18,inscrits :9},
  {id : 'E05',titre:'Forum projets',categorie:'Rencontre',capacite : 50,inscrits :49},
  {id : 'E06',titre:'Decouverte Git',categorie:'Atelier',capacite : 24,inscrits :24},

]

function placesRestantes(e : Evenement):number{
  return e.capacite > e.inscrits ? e.capacite - e.inscrits : 0;
}


function statutEvenement (e : Evenement) : string{
  const r = placesRestantes(e);

  return  r>=4 ? 'ouvert' : r>=1 && r<=3 ? 'presque complet' : 'complet';
};



type BadgeEtatProp = { statut : string };
function BadgeEtat({statut} : BadgeEtatProp ){
    const couleur = statut === 'complet' ? 'red' :statut === 'presque complet' ? 'orange' :'lightgreen';

  return (
    <View style={{ backgroundColor: couleur,borderRadius : 9 , margin : 6,padding : 4,}}>
      <Text style={styles.badge}>{statut}</Text>
    </View>

  );

}


type cartevenementprops = {evenement : Evenement};
function CarteEvenement({evenement} : cartevenementprops){
  const {titre,categorie} = evenement ;
  const place = placesRestantes(evenement);
  return(
  <View style={styles.carte}>
    <Text style={styles.titrecarte}>{titre}</Text>
    <Text style={styles.categorie}>{categorie}</Text>
    <Text style={styles.place_rest}>les places restants est : {place}</Text>
    <BadgeEtat statut={statutEvenement(evenement)}/>
  </View>
  );

}

type BlocStatistiquepropre = {
  libelle : string,nombre : number,
};
function BlocStatistique({libelle,nombre} : BlocStatistiquepropre){
  return(
    <View>
      <Text style={styles.libelle}>{libelle}</Text>
      <Text style={styles.nombre}>{nombre}</Text>
    </View>
  );
}

export default function App(){

const nbr_total_evenment = evenements.length;

const nbr_evenement_complet = evenements.filter((e) => statutEvenement(e) === 'complet').length;

const nbr_evenement_place = evenements.filter((e) => placesRestantes(e)>0).length;

const somme_place_restant = evenements.reduce((somme,e)=>somme+placesRestantes(e),0);

const atelier_dipose_place = evenements.filter((e)=> e.categorie === 'Atelier' && placesRestantes(e) > 0);

const mode : 'tous' | 'ateliers' = 'tous';
const evenementafficher = evenements.filter((e) =>mode === 'tous' ||atelier_dipose_place);
  
return (

  <FlatList data={evenementafficher} keyExtractor={(item) => item.id} contentContainerStyle={styles.page}
    ListHeaderComponent={
      <View>
        <View style={styles.entetecarte}>
          <Text style={styles.titre}>CampusAgenda</Text>
          <Text style={styles.soustitre}>Evenements du campus</Text>
        </View>

        <View style={styles.statistique}>
          <BlocStatistique libelle="Nombre total" nombre={nbr_total_evenment} />
          <BlocStatistique libelle="Événements complets" nombre={nbr_evenement_complet} />
          <BlocStatistique libelle="Événements avec places" nombre={nbr_evenement_place} />
          <BlocStatistique libelle="Places restantes" nombre={somme_place_restant} />
        </View>

        <View style={styles.mode}>
          <Text>
            {mode === 'tous' ? 'Tous les événements' : 'Ateliers disponibles'}</Text>
        </View>
      </View>
    }

    renderItem={({item}) => (<CarteEvenement evenement={item} />)}
    ListEmptyComponent={<Text>Aucun événement disponible.</Text>}
  />
);
}


const styles = StyleSheet.create({

  page: {backgroundColor: '#F1F5F9',padding: 15,paddingBottom: 30,},

  entetecarte: {padding: 20,borderRadius: 15,marginBottom: 22,},

  titre: {fontSize: 30,fontWeight: 'bold',color: '#2f0a76',},

  soustitre: {fontSize: 15,color: '#3b5f8e',marginTop: 5,fontWeight : 'bold'},

  statistique: {flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between',marginBottom: 20,},

  blocStatistique: {width: '48%',backgroundColor: '#FFFFFF',padding: 15,borderRadius: 12,marginBottom: 12,},

  libelle: {fontSize: 12,color: '#4e5b6d',marginBottom: 8,fontWeight : 'bold'},

  nombre: {fontSize: 25,fontWeight: 'bold',color: '#768ab4',},

  mode: {marginBottom: 15,padding: 12,backgroundColor: '#cbd7e6',borderRadius: 10,},

  carte: {backgroundColor: '#FFFFFF',padding: 16, marginBottom: 12,borderRadius: 12,},

  titrecarte: {fontSize: 18,fontWeight: 'bold',color: '#1E293B',marginBottom: 6,},

  categorie: {fontSize: 14,color: '#64748B',marginBottom: 8,},

  place_rest: {fontSize: 14,color: '#334155',marginBottom: 10,},

  badge: {color: '#FFFFFF',fontWeight: 'bold',padding: 6,},
});

