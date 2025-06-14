import { useState } from "react";
import { cn } from "@/lib/utils";
import data from "../data/portfolioInfo.json"

const { skills } = data;

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  let uniqueSkills = []
  skills.forEach(skill => {
    let duplicate = uniqueSkills.find(e => e.name == skill.name);
    if (!duplicate) {
      uniqueSkills.push(skill)
    }
  })
  // const filteredSkills = uniqueSkills.filter(
  //   (skill) => activeCategory === "all" || skill.category === activeCategory

  // );
  const filteredSkills = (activeCategory === "all") ? uniqueSkills.filter(
    (skill) => activeCategory === "all"

  ) : skills.filter(
    (skill) => skill.category === activeCategory

  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
            >
              <img
                src={skill.image}
                alt="Image"
                className="w-20 h-auto object-cover transition-transform duration-600 group-hover:scale-200"
              />
              {/* <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
