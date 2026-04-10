import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Card, List, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const content = {
  en: {
    title: "Meditation",
    subtitle: "The Path to Inner Harmony",
    description: `Discover the ancient art of meditation, a timeless practice rooted in Ayurveda that nurtures your mind, body, and spirit. Meditation is more than just a moment of stillness – it's a journey to balance, deep relaxation, and holistic wellness.

By calming the mind and focusing your energy, meditation helps restore the natural flow of life force, or prana, within your body. It aids in reducing stress, improving concentration, enhancing emotional clarity, and promoting a sense of peace.

In Ayurveda, meditation is aligned with the body's doshas (Vata, Pitta, and Kapha), helping you find balance according to your unique constitution. Whether you're seeking relief from anxiety, improving your sleep, or simply grounding yourself, meditation offers a simple yet profound remedy. Take a few minutes each day to reconnect with your inner self and experience the transformative power of mindful presence.`,
    techniques: [
      {
        title: "Pranayama Meditation",
        description: "Breath control techniques to balance mind and body",
        steps: [
          "Find a comfortable seated position",
          "Close your eyes and focus on your breath",
          "Practice alternate nostril breathing",
          "Maintain for 10-15 minutes",
          "End with deep relaxation"
        ]
      },
      {
        title: "Om Meditation",
        description: "Sacred sound vibration for inner peace",
        steps: [
          "Sit in a quiet space",
          "Close your eyes and center yourself",
          "Chant 'Om' with deep resonance",
          "Feel the vibration throughout your body",
          "Practice for 10-20 minutes"
        ]
      }
    ]
  },
  mr: {
    title: "ध्यान",
    subtitle: "अंतर्गत सुसंवादाचा मार्ग",
    description: `आयुर्वेदात मुळ असलेली ध्यानाची प्राचीन कला शोधा, जी तुमच्या मन, शरीर आणि आत्म्याचे पोषण करते. ध्यान हे केवळ स्थिरतेची क्षण नाही - हा संतुलन, खोल विश्रांती आणि समग्र आरोग्याचा प्रवास आहे.

मन शांत करून आणि तुमची ऊर्जा केंद्रित करून, ध्यान तुमच्या शरीरातील जीवन शक्तीचा किंवा प्राणाचा नैसर्गिक प्रवाह पुनर्संचयित करण्यास मदत करते. हे तणाव कमी करणे, एकाग्रता सुधारणे, भावनिक स्पष्टता वाढवणे आणि शांतीची भावना वाढवण्यास मदत करते.

आयुर्वेदात, ध्यान हे शरीराच्या दोषांशी (वात, पित्त आणि कफ) संरेखित केले जाते, जे तुम्हाला तुमच्या अद्वितीय घटनेनुसार संतुलन शोधण्यास मदत करते. मग तुम्ही चिंतेपासून मुक्तता शोधत असाल, तुमची झोप सुधारत असाल किंवा केवळ स्वतःला स्थिर करत असाल, ध्यान एक साधा परंतु खोल उपाय देते. दररोज काही मिनिटे घ्या आणि तुमच्या अंतर्मनाशी पुन्हा जोडा आणि जाणीवपूर्वक उपस्थितीची परिवर्तनीय शक्ती अनुभवा.`,
    techniques: [
      {
        title: "प्राणायाम ध्यान",
        description: "मन आणि शरीर संतुलित करण्यासाठी श्वास नियंत्रण तंत्रे",
        steps: [
          "आरामदायी बसण्याची स्थिती शोधा",
          "डोळे बंद करा आणि श्वासावर लक्ष केंद्रित करा",
          "अनुलोम-विलोम श्वास करा",
          "10-15 मिनिटे टिकवून ठेवा",
          "खोल विश्रांतीसह संपवा"
        ]
      },
      {
        title: "ॐ ध्यान",
        description: "अंतर्गत शांतीसाठी पवित्र ध्वनी कंपन",
        steps: [
          "शांत जागेत बसा",
          "डोळे बंद करा आणि स्वतःला केंद्रित करा",
          "खोल प्रतिध्वनीसह 'ॐ' चा जप करा",
          "संपूर्ण शरीरात कंपन जाणवा",
          "10-20 मिनिटे सराव करा"
        ]
      }
    ]
  }
};

export default function MeditationScreen() {
  const navigation = useNavigation();
  const [language, setLanguage] = useState<'en' | 'mr'>('mr');

  const openDrawer = () => {
    // @ts-ignore: dispatch exists but TypeScript doesn't recognize it
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'mr' : 'en');
  };

  const currentContent = content[language];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Meditation.jpg')}
        style={styles.header}
      >
        <View style={styles.headerOverlay}>
          <View style={styles.headerTop}>
            <IconButton
              icon="menu"
              iconColor="#FFFFFF"
              size={28}
              onPress={openDrawer}
              style={styles.menuButton}
            />
            <View style={styles.translateContainer}>
              <TouchableOpacity 
                style={styles.translateWrapper}
                onPress={toggleLanguage}
              >
                <IconButton
                  icon="translate"
                  iconColor="#FFFFFF"
                  size={24}
                  style={styles.translateButton}
                />
                <Text style={styles.translateText}>
                  {language === 'en' ? 'मराठी' : 'ENG'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            {currentContent.title}
          </Text>
          <Text style={styles.headerSubtitle}>
            {currentContent.subtitle}
          </Text>
        </View>
      </ImageBackground>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Card style={styles.introCard}>
          <Card.Content>
            <Text style={styles.introText}>
              {currentContent.description}
            </Text>
          </Card.Content>
        </Card>

        {currentContent.techniques.map((technique, index) => (
          <Card key={index} style={styles.techniqueCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.techniqueTitle}>
                {technique.title}
              </Text>
              <Text style={styles.techniqueDescription}>
                {technique.description}
              </Text>
              <List.Section>
                <List.Subheader style={styles.stepsHeader}>
                  {language === 'en' ? 'Practice Steps' : 'सराव पायऱ्या'}
                </List.Subheader>
                {technique.steps.map((step, idx) => (
                  <List.Item
                    key={idx}
                    title={step}
                    left={props => <List.Icon {...props} icon="meditation" color="#0B3B2D" />}
                    titleStyle={styles.stepText}
                  />
                ))}
              </List.Section>
            </Card.Content>
          </Card>
        ))}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F4',
  },
  header: {
    height: 200,
  },
  headerOverlay: {
    height: '100%',
    backgroundColor: 'rgba(11, 59, 45, 0.6)',
    padding: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  menuButton: {
    margin: 0,
    backgroundColor: 'rgba(11, 59, 45, 0.5)',
    borderRadius: 8,
  },
  translateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  translateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  translateButton: {
    margin: 0,
  },
  translateText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: -8,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
    marginTop: 'auto',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  introCard: {
    marginBottom: 16,
    backgroundColor: '#0B3B2D',
    borderRadius: 12,
  },
  introText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  techniqueCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  techniqueTitle: {
    fontWeight: 'bold',
    color: '#0B3B2D',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  techniqueDescription: {
    color: '#0B3B2D',
    marginBottom: 16,
    opacity: 0.8,
    fontFamily: 'Poppins-Regular',
  },
  stepsHeader: {
    color: '#0B3B2D',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  stepText: {
    color: '#0B3B2D',
    fontFamily: 'Poppins-Regular',
  },
  bottomPadding: {
    height: 16,
  },
}); 