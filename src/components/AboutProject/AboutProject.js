//AboutProject — компонент с описанием дипломного проекта.
import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__columns">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные
            доработки.</p>

        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.</p>

        </div>
      </div>
      <div className="about-project__timetables">
        <div className="about-project__timetable about-project__timetable_theme_dark">
          <p className="about-project__time about-project__time_theme_dark">1 неделя</p>
          <span className="about-project__service">Back-end</span>
        </div>
        <div className="about-project__timetable about-project__timetable_theme_grey">
          <p className="about-project__time about-project__time_theme_grey">4 недели</p>
          <span className="about-project__service">Front-end</span>
        </div>

      </div>
    </section>
  );
}

export default AboutProject;