// const
document.addEventListener("DOMContentLoaded", function()  {
  populate();


} );


class SkillItem {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    }
}


const skills = [
  new SkillItem("ReactJS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"),
  new SkillItem("ExpressJS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-line.svg"),
  new SkillItem("NodeJS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"),
  new SkillItem("NextJS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"),
  new SkillItem("TailwindCSS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"),
  new SkillItem("HTML5", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"),
  new SkillItem("CSS3", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"),
  new SkillItem("JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"),
  new SkillItem("PHP", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"),
  new SkillItem("Dart", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg"),
  new SkillItem("Flutter", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"),
  new SkillItem("Laravel", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg"),
  new SkillItem("Git", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"),
  new SkillItem("GitHub", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"),
  new SkillItem("Figma", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"),
  new SkillItem("Docker", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"),
  new SkillItem("Linux", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"),
  new SkillItem("MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"),
]




function drawItem(SkillItem) {

  return `
     <div class="flex flex-col border border-blue-600/20 bg-blue-600/5 backdrop-blur-80 rounded-lg p-4 items-center justify-center w-32 h-32 hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
              <img src="${SkillItem.icon}" alt="" width="80">
              <p class="text-center text-sm font-bold mt-2">${SkillItem.name}</p>
            </div>
  `;
 }

function populate() {
  const skillsContainer = document.getElementById("skills-container");

  skills.forEach(skill => {
    const skillItem = drawItem(skill);
    skillsContainer.innerHTML += skillItem;
  });


}