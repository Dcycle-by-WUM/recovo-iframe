import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  const cards = [
    {
      icon: '/cardLogo.svg',
      title: 'Climate change',
      contaminationValue: 15.5,
      unit: 'PH4',
      percentageSaved: '50%',
      bottlesSaved: 10
    },
    {
      icon: '/cardLogo.svg',
      title: 'Eutrophication',
      contaminationValue: 15.5,
      unit: 'Kg CO2 eq.',
      percentageSaved: '50%',
      bottlesSaved: 10
    },
    {
      icon: '/cardLogo.svg',
      title: 'Water footprint',
      contaminationValue: 15.5,
      unit: 'L H2O eq.',
      percentageSaved: '50%',
      bottlesSaved: 10
    }
  ];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>PRODUCT ENVIRONMENTAL PROFILE</h1>
        <div className={styles.logoWrapper}>
          <h2>Data via</h2>
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
              <div className={styles.saved}>
                <p>{card.percentageSaved}</p>
                <span>Saved</span>
              </div>
              <div className={styles.bottles}>
                <p>{card.bottlesSaved}</p>
                <Image alt='bottle' src='/bottle.svg' width={6} height={16} />
                <span>Bottles</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
