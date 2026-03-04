const express = require('express');
const router = express.Router();

// Career knowledge base with courses and LinkedIn professionals
const careerDatabase = {
    // AI / ML
    'ai-python': {
        career: 'AI Engineer',
        description: 'Design and build AI-powered systems and models',
        skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch'],
        courses: [
            { title: 'Machine Learning by Andrew Ng', platform: 'Coursera', url: 'https://www.coursera.org/learn/machine-learning' },
            { title: 'Deep Learning Specialization', platform: 'Coursera', url: 'https://www.coursera.org/specializations/deep-learning' },
            { title: 'Python for Data Science', platform: 'edX', url: 'https://www.edx.org/course/python-for-data-science' },
        ],
        professionals: [
            { name: 'Andrew Ng', title: 'AI Researcher & Educator', url: 'https://www.linkedin.com/in/andrewyng/' },
            { name: 'Yann LeCun', title: 'Chief AI Scientist at Meta', url: 'https://www.linkedin.com/in/yann-lecun-0b999/' },
            { name: 'Ian Goodfellow', title: 'AI Researcher', url: 'https://www.linkedin.com/in/ian-goodfellow-b7187941/' },
        ],
    },
    'ai-data': {
        career: 'Data Scientist',
        description: 'Analyze complex data to drive business decisions',
        skills: ['Python', 'R', 'Statistics', 'Machine Learning', 'Data Visualization'],
        courses: [
            { title: 'IBM Data Science Professional', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/ibm-data-science' },
            { title: 'Data Science with Python', platform: 'edX', url: 'https://www.edx.org/course/data-science-with-python' },
            { title: 'Statistics for Data Science', platform: 'Udemy', url: 'https://www.udemy.com/course/statistics-for-data-science-and-business-analysis/' },
        ],
        professionals: [
            { name: 'DJ Patil', title: 'Former US Chief Data Scientist', url: 'https://www.linkedin.com/in/dj-patil-b56a4/' },
            { name: 'Monica Rogati', title: 'Data Advisor', url: 'https://www.linkedin.com/in/mrogati/' },
            { name: 'Hilary Mason', title: 'Founder at Fast Forward Labs', url: 'https://www.linkedin.com/in/hilarymason/' },
        ],
    },
    // Design
    'design-communication': {
        career: 'UI/UX Designer',
        description: 'Create beautiful, user-centered digital experiences',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
        courses: [
            { title: 'Google UX Design Certificate', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
            { title: 'UI/UX Design Bootcamp', platform: 'Udemy', url: 'https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/' },
            { title: 'Design Thinking', platform: 'IDEO', url: 'https://www.ideou.com/pages/design-thinking' },
        ],
        professionals: [
            { name: 'Julie Zhuo', title: 'Former VP Design at Facebook', url: 'https://www.linkedin.com/in/juliezhuo/' },
            { name: 'Don Norman', title: 'Design Researcher & Author', url: 'https://www.linkedin.com/in/donnorman/' },
            { name: 'Veerle Pieters', title: 'Graphic & Web Designer', url: 'https://www.linkedin.com/in/veerlepieters/' },
        ],
    },
    'design-creativity': {
        career: 'Graphic Designer',
        description: 'Create visual content for digital and print media',
        skills: ['Adobe Photoshop', 'Illustrator', 'Typography', 'Branding', 'Color Theory'],
        courses: [
            { title: 'Graphic Design Masterclass', platform: 'Udemy', url: 'https://www.udemy.com/course/graphic-design-masterclass/' },
            { title: 'Design Principles', platform: 'Coursera', url: 'https://www.coursera.org/learn/design-principles' },
            { title: 'Adobe Creative Suite', platform: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/topics/adobe-creative-suite' },
        ],
        professionals: [
            { name: 'Paula Scher', title: 'Graphic Designer at Pentagram', url: 'https://www.linkedin.com/in/paulascher/' },
            { name: 'Stefan Sagmeister', title: 'Renowned Designer', url: 'https://www.linkedin.com/in/sagmeister/' },
            { name: 'Aaron Draplin', title: 'Founder at DDC', url: 'https://www.linkedin.com/in/aarondraplin/' },
        ],
    },
    // Web Development
    'web-javascript': {
        career: 'Full Stack Developer',
        description: 'Build complete web applications from front to back',
        skills: ['React', 'Node.js', 'JavaScript', 'HTML/CSS', 'Databases'],
        courses: [
            { title: 'The Web Developer Bootcamp', platform: 'Udemy', url: 'https://www.udemy.com/course/the-web-developer-bootcamp/' },
            { title: 'Full Stack Open', platform: 'University of Helsinki', url: 'https://fullstackopen.com/en/' },
            { title: 'CS50 Web Programming', platform: 'edX', url: 'https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript' },
        ],
        professionals: [
            { name: 'Wes Bos', title: 'Full Stack Developer & Educator', url: 'https://www.linkedin.com/in/wesbos/' },
            { name: 'Scott Tolinski', title: 'Web Developer & Content Creator', url: 'https://www.linkedin.com/in/scotttolinski/' },
            { name: 'Kent C. Dodds', title: 'Software Engineer', url: 'https://www.linkedin.com/in/kentcdodds/' },
        ],
    },
    'web-coding': {
        career: 'Frontend Developer',
        description: 'Create engaging and responsive user interfaces',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js'],
        courses: [
            { title: 'Frontend Developer Career Path', platform: 'Scrimba', url: 'https://scrimba.com/learn/frontend' },
            { title: 'JavaScript Algorithms', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' },
            { title: 'React Complete Guide', platform: 'Udemy', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/' },
        ],
        professionals: [
            { name: 'Dan Abramov', title: 'React Core Team Member', url: 'https://www.linkedin.com/in/dan-abramov-9944a36/' },
            { name: 'Sarah Drasner', title: 'VP Engineering at Netlify', url: 'https://www.linkedin.com/in/sarahdrasner/' },
            { name: 'Addy Osmani', title: 'Engineering Lead at Google', url: 'https://www.linkedin.com/in/addyosmani/' },
        ],
    },
    // Security
    'security-networking': {
        career: 'Cybersecurity Analyst',
        description: 'Protect digital assets and systems from threats',
        skills: ['Network Security', 'Ethical Hacking', 'SIEM', 'Incident Response', 'Penetration Testing'],
        courses: [
            { title: 'CompTIA Security+', platform: 'CompTIA', url: 'https://www.comptia.org/certifications/security' },
            { title: 'Certified Ethical Hacker', platform: 'EC-Council', url: 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/' },
            { title: 'Google Cybersecurity Certificate', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
        ],
        professionals: [
            { name: 'Bruce Schneier', title: 'Security Technologist & Author', url: 'https://www.linkedin.com/in/bruce-schneier-4b90b7/' },
            { name: 'Troy Hunt', title: 'Founder of HaveIBeenPwned', url: 'https://www.linkedin.com/in/troyhunt/' },
            { name: 'Parisa Tabriz', title: 'VP Engineering at Google', url: 'https://www.linkedin.com/in/parisa-tabriz-1a79a35/' },
        ],
    },
    // Cloud / DevOps
    'cloud-linux': {
        career: 'Cloud Engineer',
        description: 'Architect and manage cloud infrastructure',
        skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
        courses: [
            { title: 'AWS Certified Solutions Architect', platform: 'AWS', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
            { title: 'Google Cloud Professional', platform: 'Google', url: 'https://cloud.google.com/certification' },
            { title: 'Docker & Kubernetes', platform: 'Udemy', url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/' },
        ],
        professionals: [
            { name: 'Corey Quinn', title: 'Cloud Economist at DuckBill Group', url: 'https://www.linkedin.com/in/coreyquinn/' },
            { name: 'Kelsey Hightower', title: 'Staff Engineer at Google', url: 'https://www.linkedin.com/in/kelsey-hightower-849b9823/' },
            { name: 'Werner Vogels', title: 'CTO at Amazon', url: 'https://www.linkedin.com/in/wernervogels/' },
        ],
    },
    // Mobile
    'mobile-java': {
        career: 'Android Developer',
        description: 'Build native Android mobile applications',
        skills: ['Java', 'Kotlin', 'Android SDK', 'Firebase', 'REST APIs'],
        courses: [
            { title: 'Android Developer Fundamentals', platform: 'Google', url: 'https://developer.android.com/courses' },
            { title: 'Kotlin Android Development', platform: 'Udemy', url: 'https://www.udemy.com/course/the-complete-android-kotlin-developer-course/' },
            { title: 'Android App Development', platform: 'Coursera', url: 'https://www.coursera.org/specializations/android-app-development' },
        ],
        professionals: [
            { name: 'Romain Guy', title: 'Principal Engineer at Google', url: 'https://www.linkedin.com/in/romainGuy/' },
            { name: 'Chet Haase', title: 'Principal Engineer at Google', url: 'https://www.linkedin.com/in/chethaase/' },
            { name: 'Jake Wharton', title: 'Android Developer at Cash App', url: 'https://www.linkedin.com/in/jakewharton/' },
        ],
    },
    'mobile-swift': {
        career: 'iOS Developer',
        description: 'Build native iOS and macOS applications',
        skills: ['Swift', 'SwiftUI', 'Xcode', 'CoreData', 'UIKit'],
        courses: [
            { title: '100 Days of SwiftUI', platform: 'Hacking with Swift', url: 'https://www.hackingwithswift.com/100/swiftui' },
            { title: 'iOS App Development', platform: 'Coursera', url: 'https://www.coursera.org/specializations/app-development' },
            { title: 'Swift Programming', platform: 'Apple', url: 'https://developer.apple.com/swift/resources/' },
        ],
        professionals: [
            { name: 'Paul Hudson', title: 'iOS Developer & Educator', url: 'https://www.linkedin.com/in/paulhudsonuk/' },
            { name: 'Soroush Khanlou', title: 'iOS Developer', url: 'https://www.linkedin.com/in/skhanlou/' },
            { name: 'Natalia Panferova', title: 'iOS Developer', url: 'https://www.linkedin.com/in/nataliapanferova/' },
        ],
    },
    // Business / Management
    'business-communication': {
        career: 'Product Manager',
        description: 'Lead product strategy and development lifecycle',
        skills: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis', 'Roadmapping'],
        courses: [
            { title: 'Product Management Certification', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-project-management' },
            { title: 'Agile Project Management', platform: 'edX', url: 'https://www.edx.org/course/agile-project-management' },
            { title: 'PM School', platform: 'Product School', url: 'https://productschool.com/' },
        ],
        professionals: [
            { name: 'Marty Cagan', title: 'Founder at SVPG', url: 'https://www.linkedin.com/in/martycagan/' },
            { name: 'Gibson Biddle', title: 'Ex-VP Product at Netflix', url: 'https://www.linkedin.com/in/gibsonbiddle/' },
            { name: 'Ken Norton', title: 'Partner at GV', url: 'https://www.linkedin.com/in/kennethnorton/' },
        ],
    },
    // Data
    'data-excel': {
        career: 'Data Analyst',
        description: 'Transform raw data into actionable business insights',
        skills: ['Excel', 'SQL', 'Python', 'Tableau', 'Power BI'],
        courses: [
            { title: 'Google Data Analytics Certificate', platform: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
            { title: 'SQL for Data Analysis', platform: 'Udacity', url: 'https://www.udacity.com/course/sql-for-data-analysis--ud198' },
            { title: 'Tableau Training', platform: 'Tableau', url: 'https://www.tableau.com/learn/training' },
        ],
        professionals: [
            { name: 'Ben Stancil', title: 'Co-founder at Mode Analytics', url: 'https://www.linkedin.com/in/benstancil/' },
            { name: 'Julia Silge', title: 'Data Scientist at RStudio', url: 'https://www.linkedin.com/in/juliasilge/' },
            { name: 'David Robinson', title: 'Principal Data Scientist', url: 'https://www.linkedin.com/in/david-robinson-3584591/' },
        ],
    },
};

// Default career recommendation function
function getCareerRecommendation(interest, skill) {
    const interestLower = interest.toLowerCase().trim();
    const skillLower = skill.toLowerCase().trim();

    // Try exact combination key
    const key = `${interestLower}-${skillLower}`;
    if (careerDatabase[key]) return careerDatabase[key];

    // Try partial matching
    for (const [dbKey, career] of Object.entries(careerDatabase)) {
        const [dbInterest, dbSkill] = dbKey.split('-');
        if (interestLower.includes(dbInterest) || dbInterest.includes(interestLower)) {
            if (skillLower.includes(dbSkill) || dbSkill.includes(skillLower)) {
                return career;
            }
        }
    }

    // Interest-only match
    for (const [dbKey, career] of Object.entries(careerDatabase)) {
        const [dbInterest] = dbKey.split('-');
        if (interestLower.includes(dbInterest) || dbInterest.includes(interestLower)) {
            return career;
        }
    }

    // Skill-only match
    for (const [dbKey, career] of Object.entries(careerDatabase)) {
        const [, dbSkill] = dbKey.split('-');
        if (skillLower.includes(dbSkill) || dbSkill.includes(skillLower)) {
            return career;
        }
    }

    // Default fallback
    return {
        career: 'Software Developer',
        description: 'Build and maintain software applications',
        skills: ['Programming', 'Problem Solving', 'Data Structures', 'Algorithms', 'Version Control'],
        courses: [
            { title: 'CS50 Introduction to Computer Science', platform: 'edX', url: 'https://www.edx.org/course/cs50s-introduction-to-computer-science' },
            { title: 'The Odin Project', platform: 'The Odin Project', url: 'https://www.theodinproject.com/' },
            { title: 'freeCodeCamp', platform: 'freeCodeCamp', url: 'https://www.freecodecamp.org/' },
        ],
        professionals: [
            { name: 'Linus Torvalds', title: 'Creator of Linux', url: 'https://www.linkedin.com/in/linustorvalds/' },
            { name: 'Guido van Rossum', title: 'Creator of Python', url: 'https://www.linkedin.com/in/guido-van-rossum-4a0756/' },
            { name: 'Brendan Eich', title: 'Creator of JavaScript', url: 'https://www.linkedin.com/in/brendaneich/' },
        ],
    };
}

// Career Recommendation API
router.get('/recommend', (req, res) => {
    const { interest, skill } = req.query;

    if (!interest || !skill) {
        return res.status(400).json({ error: 'Please provide both interest and skill parameters.' });
    }

    const result = getCareerRecommendation(interest, skill);

    res.json({
        message: 'Career recommendation generated successfully',
        career: result.career,
        description: result.description,
        requiredSkills: result.skills,
        courses: result.courses,
        professionals: result.professionals,
        received: { interest, skill },
    });
});

// All Careers API
router.get('/all', (req, res) => {
    const careers = Object.values(careerDatabase).map(c => ({
        career: c.career,
        description: c.description,
    }));
    const unique = [...new Map(careers.map(c => [c.career, c])).values()];
    res.json({ careers: unique });
});

module.exports = router;
