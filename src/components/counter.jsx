import React, { useState } from 'react';

const questions = {
    easy: {
      english: [
        'What is the capital of France?',
        'What is the largest country in South America?',
        'What is the smallest state in the USA?',
      ],
      spanish: '¿Cuál es la capital de España?',
      french: 'Quelle est la capitale de l\'Italie?'
    },
    medium: {
      english: 'What is the largest planet in our solar system?',
      spanish: '¿Cuál es el planeta más cercano al sol?',
      french: 'Quelle est la planète la plus proche de la Terre?'
    },
    hard: {
      english: 'What is the smallest country in the world by land area?',
      spanish: '¿Cuál es el país más grande de América Latina?',
      french: 'Quel est le plus grand pays d\'Afrique?'
    }
  };
  

  const App = ({posts}) => {
    const [difficulty, setDifficulty] = useState('');
    const [language, setLanguage] = useState('');
    const [showAllQuestions, setShowAllQuestions] = useState(false);
  
    const handleLanguageClick = (language) => {
      setLanguage(language);
      setDifficulty('');
      setShowAllQuestions(false);
    };
  
    const handleDifficultyClick = (difficulty) => {
      setDifficulty(difficulty);
      setShowAllQuestions(false);
    };
  
    const handleAllQuestionsClick = () => {
      setShowAllQuestions(true);
    };
  
    const handleResetClick = () => {
      setDifficulty('');
      setLanguage('');
      setShowAllQuestions(false);
    };
  
    return (
      <div>
        <button onClick={handleAllQuestionsClick}>All Questions</button><br />
        <button onClick={handleResetClick}>Reset</button>
        <div>
          <h2>Select Language:</h2>
          <button onClick={() => handleLanguageClick('english')} style={{ backgroundColor: language === 'english' ? 'green' : 'white' }}>English</button>
          <button onClick={() => handleLanguageClick('spanish')} style={{ backgroundColor: language === 'spanish' ? 'green' : 'white' }}>Spanish</button>
          <button onClick={() => handleLanguageClick('french')} style={{ backgroundColor: language === 'french' ? 'green' : 'white' }}>French</button>
        </div>
        {language && (
          <div>
            <h2>Select Difficulty:</h2>
            <button onClick={() => handleDifficultyClick('easy')} style={{ backgroundColor: difficulty === 'easy' ? 'green' : 'white' }}>Easy</button>
            <button onClick={() => handleDifficultyClick('medium')} style={{ backgroundColor: difficulty === 'medium' ? 'green' : 'white' }}>Medium</button>
            <button onClick={() => handleDifficultyClick('hard')} style={{ backgroundColor: difficulty === 'hard' ? 'green' : 'white' }}>Hard</button>
          </div>
        )}
        {language && difficulty && (
          <div>
            <h2>Question:</h2>
            <p>{questions[difficulty][language]}</p>
          </div>
        )}
        {showAllQuestions && (
          <div>
            <h2>All Questions:</h2>
            <ul>
              {Object.keys(questions).map(difficulty => (
                <li key={difficulty}>
                  <h3>{difficulty}</h3>
                  <ul>
                    {Object.keys(questions[difficulty]).map(language => (
                      <li key={language}>
                        <p>{language}: {questions[difficulty][language]}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default App;
  

