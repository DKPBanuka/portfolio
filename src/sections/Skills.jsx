// src/sections/Skills.jsx

import React, { useEffect, useState } from 'react';
import { TagSphere } from 'react-tag-sphere';
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiMongodb, SiLinux, SiDocker, SiKubernetes, SiFigma, SiMysql, SiGit, SiAnsible } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// Array of skill icons with names, brand colors and DevOps role marking
const skillIcons = [
  { icon: <SiHtml5 />, name: 'HTML5', color: '#E34F26' },
  { icon: <SiCss3 />, name: 'CSS3', color: '#1572B6' },
  { icon: <SiJavascript />, name: 'JavaScript', color: '#F0DB4F' },
  { icon: <SiReact />, name: 'React', color: '#61DAFB' },
  { icon: <SiNextdotjs />, name: 'Next.js', color: '#000000' },
  { icon: <SiNodedotjs />, name: 'Node.js', color: '#539E43' },
  { icon: <SiPython />, name: 'Python', color: '#3776AB', isDevOps: true },
  { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
  { icon: <SiLinux />, name: 'Linux', color: '#000000', isDevOps: true },
  { icon: <SiDocker />, name: 'Docker', color: '#2496ED', isDevOps: true },
  { icon: <SiKubernetes />, name: 'Kubernetes', color: '#326CE5', isDevOps: true },
  { icon: <SiFigma />, name: 'Figma', color: '#F24E1E' },
  { icon: <FaJava />, name: 'Java', color: '#007396' },
  { icon: <SiMysql />, name: 'MySQL', color: '#00758F' },
  { icon: <SiGit />, name: 'Git', color: '#F05032', isDevOps: true },
  { icon: <SiAnsible />, name: 'Ansible', color: '#EE0000', isDevOps: true },
];

// We'll build the tag elements at render time (after mount) so TagSphere can measure
// their DOM nodes safely. That prevents accessing offsetWidth on a null ref.

const Skills = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only render TagSphere on the client after mount to avoid measurement during SSR/initial render
    setMounted(true);
  }, []);

  // Build tags as inline spans (TagSphere wraps and measures these)
  const tags = skillIcons.map(({ icon, name, isDevOps, color }) => (
    <span
      key={name}
      className={`inline-flex flex-col items-center justify-center mx-2 group skill-wrapper ${isDevOps ? 'devops-badge' : ''}`}
      style={{ minWidth: 60, ['--skill-color']: color }}
    >
      <span className={`skill-name text-xs mb-1 font-semibold transition-colors duration-200 text-gray-500`}>{name}</span>
      <span
        className={`transition-transform duration-200 group-hover:scale-125 group-hover:drop-shadow-lg`}
        style={{ fontSize: '2rem', color }}
      >{icon}</span>
    </span>
  ));

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Skills & Technologies</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12">Crafting digital experiences with modern tools</p>
        
        {/* Container for the TagSphere component */}
        <div className="flex justify-center items-center">
          {mounted ? (
            <TagSphere
              tags={tags}
              radius={250}
              fullWidth={false}
              fullHeight={false}
              style={{
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                height: 500,
              }}
            />
          ) : (
            <div className="w-full h-[500px] flex items-center justify-center text-gray-400">Loading skills…</div>
          )}
          <style>{`
.devops-badge {
  border-radius: 0.5rem;
  background: rgba(37,99,235,0.08);
  padding: 0.25rem 0.5rem;
}
.skill-wrapper { --skill-color: #ff4f86; }
.skill-name { color: #6b7280; transition: color .18s ease; }
.skill-wrapper:hover .skill-name { color: var(--skill-color) !important; }
`}</style>
        </div>
      </div>
    </section>
  );
};

export default Skills;