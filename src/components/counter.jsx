import React, { useState } from 'react';
import './style.css';

const questions = {
    Easy: {
      English: [
        'What is the capital of France?',
        'What is the largest country in South America?',
        'What is the smallest state in the USA?',
      ],
      Spanish: '¿Cuál es la capital de España?',
      French: 'Quelle est la capitale de l\'Italie?'
    },
    Medium: {
      English: 'What is the largest planet in our solar system?',
      Spanish: '¿Cuál es el planeta más cercano al sol?',
      French: 'Quelle est la planète la plus proche de la Terre?'
    },
    Hard: {
      English: 'What is the smallest country in the world by land area?',
      Spanish: '¿Cuál es el país más grande de América Latina?',
      French: 'Quel est le plus grand pays d\'Afrique?'
    }
  };
  

  const App = ({posts: dbposts}) => {
    const [posts, setPosts] = useState(dbposts);
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
      <div class = "boarder">
        <button onClick={handleAllQuestionsClick}>All Questions</button><br />
        <button onClick={handleResetClick}>Reset</button>
        <div>
          <h2>Select Language:</h2>
          <button onClick={() => handleLanguageClick('English')} style={{ backgroundColor: language === 'English' ? 'green' : 'white' }}>English</button>
          <button onClick={() => handleLanguageClick('Spanish')} style={{ backgroundColor: language === 'Spanish' ? 'green' : 'white' }}>Spanish</button>
          <button onClick={() => handleLanguageClick('French')} style={{ backgroundColor: language === 'French' ? 'green' : 'white' }}>French</button>
        </div>
        {language && (
          <div>
            <h2>Select Difficulty:</h2>
            <button onClick={() => handleDifficultyClick('Easy')} style={{ backgroundColor: difficulty === 'Easy' ? 'green' : 'white' }}>Easy</button>
            <button onClick={() => handleDifficultyClick('Medium')} style={{ backgroundColor: difficulty === 'Medium' ? 'green' : 'white' }}>Medium</button>
            <button onClick={() => handleDifficultyClick('Hard')} style={{ backgroundColor: difficulty === 'Hard' ? 'green' : 'white' }}>Hard</button>
          </div>
        )}
        {language && difficulty && (
          <div className="center">
            <h2>Question:</h2>
            <p>{questions[difficulty][language]}</p>
          </div>
        )}
        {showAllQuestions && (
          <div className="center">
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
  

