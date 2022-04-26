import { google } from 'googleapis';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from '../styles/Home.module.css';

export default function Article({ row, keys }) {
  const { t } = useTranslation();

  const keysToUse = keys.filter(
    (elem) =>
      elem.key === 'Water use' ||
      elem.key === 'Global Warming' ||
      elem.key === 'Eutrophication'
  );

  const climateChange =
    row[keys.find((elem) => elem.key === 'Global Warming').index];

  const waterFootprint =
    row[keys.find((elem) => elem.key === 'Water use').index];

  const eutrophication =
    row[keys.find((elem) => elem.key === 'Eutrophication').index];

  const cards = [
    {
      icon: '/cardLogo1.svg',
      title: t('home.climateChange'),
      contaminationValue: climateChange,
      unit: 'Kg CO2 eq.',
      percentageSaved: '50%',
      bottlesSaved: 10
    },
    {
      icon: '/cardLogo3.svg',
      title: t('home.waterFootprint'),
      contaminationValue: waterFootprint,
      unit: 'L H2O eq.',
      percentageSaved: '50%',
      bottlesSaved: 10
    },
    {
      icon: '/cardLogo2.svg',
      title: t('home.eutrophication'),
      contaminationValue: eutrophication,
      unit: 'PH4',
      percentageSaved: '50%',
      bottlesSaved: 10
    }
  ];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{t('home.title')}</h1>
        <div className={styles.logoWrapper}>
          <h2>{t('home.subtitle')}</h2>
          <Image src='/dcycle.svg' alt='logo' width={91} height={30} />
        </div>
      </div>
      <div className={styles.content}>
        {cards.map((card, index) => (
          <div className={styles.card} key={`${card.title}-${index}`}>
            <Image src={card.icon} width={58} height={58} alt='card-icon' />
            <h1>{card.title}</h1>
            <div className={styles.contamination}>
              <p>{card.contaminationValue}</p>
              <span>{card.unit}</span>
            </div>
            <div className={styles.cardFooter}>
              {/* <div className={styles.saved}>
                <p>{card.percentageSaved}</p>
                <span>{t('home.saved')}</span>
              </div> */}
              {/* <div className={styles.bottles}>
                <p>{card.bottlesSaved}</p>
                <Image alt='bottle' src='/bottle.svg' width={6} height={16} />
                <span>{t('home.bottles')}</span>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p>{t('home.footer')}</p>
      </div>
    </div>
  );
}

async function gsrun(cl) {
  try {
    const gsapi = google.sheets({ version: 'v4', auth: cl });

    const opt = {
      spreadsheetId: '1NDZaSfFZCDGBRaV-RfTxxHnnXJyRPGZ_ZCxsH2J8TAY',
      range: 'data'
    };

    let response = await gsapi.spreadsheets.values.get(opt);
    let values = [];
    if (response && response.data && response.data.values) {
      values = response.data.values;
    }
    // console.log('values', values);
    return values;
  } catch (err) {
    console.log(err);
  }
}

export async function getServerSideProps({ params }) {
  try {
    // const auth = new google.auth.GoogleAuth({
    //   keyFile: 'keys.json', //the key file
    //   //url to spreadsheets API
    //   scopes: 'https://www.googleapis.com/auth/spreadsheets'
    // });

    const auth = new google.auth.JWT(
      process.env.NEXT_PUBLIC_GSS_CLIENT_EMAIL,
      null,
      process.env.NEXT_PUBLIC_GSS_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    // const authClientObject = await auth.getClient();

    // const values = await gsrun(authClientObject);

    const tokens = await auth.authorize();
    const values = await gsrun(auth);

    const { id } = params;

    const keys = values[0].map((value, index) => {
      return {
        key: value,
        index
      };
    });
    const row = values.find((row) => row[0] === id);

    return {
      props: {
        keys,
        row
      }
    };
  } catch (err) {
    console.log('ERROR', err);
    return {
      props: {}
    };
  }
}
