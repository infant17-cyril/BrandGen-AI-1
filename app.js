/* ==========================================
   BrandGen AI — Application Logic
   ========================================== */

// ── Element References ──
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const brandForm = document.getElementById('brand-form');
const btnGenerate = document.getElementById('btn-generate');
const btnRegenerate = document.getElementById('btn-regenerate');
const inputSection = document.getElementById('input-section');
const loadingSection = document.getElementById('loading-section');
const outputSection = document.getElementById('output-section');
const toast = document.getElementById('toast');

// ── Theme Management ──
function getPreferredTheme() {
    const saved = localStorage.getItem('brandgen-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('brandgen-theme', theme);
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── Toast Notification ──
function showToast(message = 'Copied to clipboard!') {
    toast.querySelector('span').textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 400);
    }, 2200);
}

// ── Copy Buttons ──
document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const text = document.getElementById(targetId).innerText;
        navigator.clipboard.writeText(text).then(() => {
            btn.classList.add('copied');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            showToast();
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    });
});

// ── Content Generation Engine ──
// This uses deterministic template-based generation with randomized variations
// to simulate AI output. In production, replace with an actual API call.

const contentTemplates = {
    Fun: {
        instagram: [
            (b, p, a) => `✨ Say hello to your new obsession! ${p} by ${b} is here and it's everything you didn't know you needed! 🎉\n\nWho's ready to level up? Drop a 🙋 below!\n\n#${b.replace(/\s/g, '')} #${p.replace(/\s/g, '')} #MustHave #GameChanger #LoveIt #TrendAlert #NewDrop`,
            (b, p, a) => `POV: You just discovered ${p} from ${b} and your life is about to change 🤩💫\n\nSeriously though, ${a} — this one's for YOU!\n\n#${b.replace(/\s/g, '')} #NewFavorite #CantStopWontStop #${p.replace(/\s/g, '')} #ViralProduct #Hot`,
            (b, p, a) => `Stop scrolling! 🛑 ${b} just dropped ${p} and it's giving EVERYTHING ✨🔥\n\nTag someone who NEEDS this!\n\n#${b.replace(/\s/g, '')} #${p.replace(/\s/g, '')} #Obsessed #MustHave #TreatYourself #NewLaunch`
        ],
        email: [
            (b, p, a) => `Subject: You're Gonna LOVE This 🎉\n\nHey there!\n\nGuess what? ${b} just launched something amazing — ${p}! And honestly, it's a total game-changer for ${a}.\n\nWe made it just for you, and trust us, you don't want to miss out. It's fun, it's fresh, and it's everything you've been waiting for.\n\n👉 Check it out now and see what all the buzz is about!\n\nCheers,\nThe ${b} Team`,
            (b, p, a) => `Subject: Big News from ${b}! 🎊\n\nHey friend!\n\nWe've been working on something special and we just CAN'T keep it a secret anymore. Introducing ${p}!\n\nDesigned with ${a} in mind, this is the upgrade you've been asking for. Fun? Check. Amazing? Double check.\n\n🔥 Grab yours before everyone else does!\n\nXO,\nTeam ${b}`
        ],
        ad: [
            (b, p, a) => `🎉 Meet ${p} by ${b}!\n\nThe fun way to upgrade your life. Made for ${a} who know what they want.\n\n✨ Try it today — you'll thank us later!\n\n👉 Shop Now`,
            (b, p, a) => `Why settle for boring? ${b}'s ${p} brings the fun! 🎊\n\nPerfect for ${a}. Seriously amazing.\n\n⚡ Get yours now → Limited time offer!`
        ],
        blog: [
            (b, p, a) => `If there's one thing we know about ${a}, it's this — you love discovering something fresh, exciting, and totally worth the hype. Well, get ready, because ${b} is about to deliver all of that and more with ${p}.\n\nIn a world full of "meh," ${p} stands out as a breath of fresh air. Whether you're new to ${b} or a long-time fan, this latest offering is designed to bring a smile to your face while solving real problems. Let's dive in and find out what makes it so special!`,
            (b, p, a) => `Ready for something awesome? ${b} just raised the bar with ${p}, and honestly, we're here for it. Designed specifically for ${a}, this isn't just another product launch — it's a whole vibe.\n\nFrom the moment you experience ${p}, you'll understand why everyone's talking about it. It's fun, it's refreshing, and it's exactly what you've been looking for. Let us break it down for you.`
        ]
    },
    Professional: {
        instagram: [
            (b, p, a) => `Introducing ${p} by ${b} — engineered for excellence, designed for results. 📊\n\nElevate your standards. Experience the difference.\n\n#${b.replace(/\s/g, '')} #${p.replace(/\s/g, '')} #Innovation #Excellence #ProfessionalGrade #Industry #Leadership`,
            (b, p, a) => `At ${b}, we believe ${a} deserve the best. That's why we created ${p} — precision-crafted to deliver measurable results. 📈\n\nDiscover what sets us apart.\n\n#${b.replace(/\s/g, '')} #${p.replace(/\s/g, '')} #QualityMatters #Expertise #TrustedBrand`,
            (b, p, a) => `${b} presents ${p} — where innovation meets reliability. Built for ${a} who demand more. 🏆\n\nSet the standard. Lead with confidence.\n\n#${b.replace(/\s/g, '')} #${p.replace(/\s/g, '')} #Professional #IndustryLeader #Innovation`
        ],
        email: [
            (b, p, a) => `Subject: Introducing ${p} — Redefining Excellence\n\nDear Valued Customer,\n\nWe are pleased to announce the launch of ${p} by ${b}. Developed with ${a} in mind, this solution represents our commitment to delivering exceptional quality and measurable results.\n\nKey highlights:\n• Industry-leading performance\n• Built on years of research and expertise\n• Tailored specifically for your needs\n\nWe invite you to explore how ${p} can help you achieve your goals.\n\n→ Learn More Today\n\nBest regards,\n${b}`,
            (b, p, a) => `Subject: A New Standard in Excellence from ${b}\n\nDear Customer,\n\n${b} is proud to introduce ${p}, our latest innovation designed exclusively for ${a}.\n\nOur team has invested extensive research into understanding your challenges, and ${p} is the result — a robust, reliable solution built to deliver real impact.\n\nReady to take the next step?\n\n→ Schedule a Consultation\n\nWith appreciation,\nThe ${b} Team`
        ],
        ad: [
            (b, p, a) => `${p} by ${b}\n\nPrecision-engineered for ${a} who demand excellence. Trusted by industry leaders.\n\nResults you can measure. Quality you can trust.\n\n→ Discover More`,
            (b, p, a) => `Elevate your standards with ${p} from ${b}.\n\nBuilt for ${a}. Backed by expertise. Driven by results.\n\n→ Get Started Today`
        ],
        blog: [
            (b, p, a) => `In today's competitive landscape, ${a} face increasing pressure to perform at the highest level. Recognizing this challenge, ${b} has developed ${p} — a solution that combines cutting-edge innovation with proven reliability.\n\nThis comprehensive guide explores how ${p} addresses the core needs of modern ${a}, delivering tangible results backed by rigorous research and development. As we examine the features, benefits, and real-world applications, it becomes clear why industry leaders are making the switch.`,
            (b, p, a) => `The pursuit of excellence requires the right tools, the right strategy, and the right partners. For ${a} seeking to elevate their approach, ${b} proudly presents ${p} — a meticulously crafted solution built on a foundation of expertise and innovation.\n\nIn this article, we'll explore the strategic advantages of ${p}, examine the research behind its development, and demonstrate why it represents a significant advancement for ${a} across the industry.`
        ]
    },
    Luxury: {
        instagram: [
            (b, p, a) => `Indulge in the extraordinary. ${p} by ${b} — where sophistication meets perfection. ✨🖤\n\nCrafted for those who accept nothing less.\n\n#${b.replace(/\s/g, '')} #${p.replace(/\s/g, '')} #Luxury #Exclusive #Premium #Refined #Elegance #Prestige`,
            (b, p, a) => `Some things are simply meant to be extraordinary. Presenting ${p} — the latest masterpiece from ${b}. 👑\n\nBecause ${a} deserve the finest.\n\n#${b.replace(/\s/g, '')} #Luxe #Opulence #${p.replace(/\s/g, '')} #FinestThings #Exclusive`,
            (b, p, a) => `Elegance, redefined. ${b} unveils ${p} — a testament to impeccable craftsmanship and timeless sophistication. 💎\n\n#${b.replace(/\s/g, '')} #${p.replace(/\s/g, '')} #LuxuryLifestyle #Exquisite #Heritage #Artistry`
        ],
        email: [
            (b, p, a) => `Subject: An Invitation to Experience ${p}\n\nDear Esteemed Client,\n\nIt is with great pleasure that ${b} unveils ${p} — a masterpiece born from our unwavering commitment to excellence and the art of refined living.\n\nMeticulously crafted for the most discerning ${a}, ${p} embodies the very essence of luxury: impeccable quality, timeless design, and an experience that transcends the ordinary.\n\nWe cordially invite you to discover this exquisite addition to our collection.\n\n→ Explore the Collection\n\nWith warm regards,\n${b} Maison`,
            (b, p, a) => `Subject: The Art of Extraordinary — ${p} Has Arrived\n\nDear Valued Patron,\n\nTrue luxury is not merely seen — it is felt. ${b} is honored to present ${p}, crafted exclusively for ${a} who appreciate the finer things in life.\n\nEvery detail has been considered, every element perfected. This is not just a product — it is an experience.\n\n→ Request Your Private Preview\n\nElegantly yours,\n${b}`
        ],
        ad: [
            (b, p, a) => `${p} by ${b}\n\nExquisitely crafted. Exclusively yours.\n\nFor ${a} who demand nothing less than perfection.\n\n→ Discover the Collection`,
            (b, p, a) => `Timeless elegance meets modern luxury.\n\n${b} presents ${p} — a masterpiece for the discerning ${a}.\n\n→ Experience Luxury`
        ],
        blog: [
            (b, p, a) => `In the realm of true luxury, every detail matters. Every texture tells a story. Every moment is an invitation to experience something extraordinary. It is within this philosophy that ${b} has created ${p} — an exquisite offering designed for ${a} who refuse to settle for anything less than perfection.\n\n${p} represents more than a mere addition to the ${b} portfolio; it is a statement of intent, a celebration of craftsmanship, and an embodiment of the brand's heritage of excellence. Join us as we explore the artistry and vision behind this remarkable creation.`,
            (b, p, a) => `Luxury is not defined by price alone — it is defined by the experience, the emotion, and the story woven into every detail. ${b} has long understood this truth, and with the introduction of ${p}, the brand once again demonstrates its mastery of creating the exceptional.\n\nDesigned exclusively for ${a}, ${p} is a testament to the art of refined living. In this feature, we delve into the inspiration, craftsmanship, and vision that make ${p} a truly remarkable offering.`
        ]
    },
    Casual: {
        instagram: [
            (b, p, a) => `Hey! 👋 Just wanted to share something cool — ${p} by ${b} is officially here and we're pretty excited about it!\n\nPerfect for ${a} who like to keep things easy and awesome 😎\n\n#${b.replace(/\s/g, '')} #${p.replace(/\s/g, '')} #LoveThis #GoodVibes #Simple #Everyday #Chill`,
            (b, p, a) => `Real talk — ${p} from ${b} is the kind of thing you didn't know you needed until you try it 😄\n\nMade for ${a}. No fuss, just good stuff.\n\n#${b.replace(/\s/g, '')} #NewFind #${p.replace(/\s/g, '')} #Awesome #DailyFave #KeepItSimple`,
            (b, p, a) => `Just dropped! ${p} by ${b} 🙌\n\nIt's chill, it's easy, it's exactly what ${a} have been looking for. Give it a try!\n\n#${b.replace(/\s/g, '')} #${p.replace(/\s/g, '')} #NewDrop #EasyBreezy #LovingIt #Relatable`
        ],
        email: [
            (b, p, a) => `Subject: Something Cool Just Landed 🙌\n\nHey!\n\nJust a quick heads up — we've got something new at ${b} and we think you're going to love it.\n\nIt's called ${p}, and we made it with ${a} in mind. Nothing fancy or complicated — just a really good product that makes your life a little easier.\n\nWanna check it out? Hit the link below!\n\n→ See What's New\n\nCatch you later,\n${b}`,
            (b, p, a) => `Subject: Hey, Have You Seen This? 👀\n\nHi there!\n\nWe're super excited to share ${p} with you. It's our latest thing at ${b}, and honestly, we think it's pretty great for ${a}.\n\nNo pressure, no hard sell — just something we believe you'll genuinely enjoy.\n\n→ Take a Look\n\nTalk soon!\nTeam ${b}`
        ],
        ad: [
            (b, p, a) => `Good stuff, no fuss. ${p} by ${b} 🙌\n\nMade for ${a} who like to keep things simple and awesome.\n\nCheck it out → You'll love it!`,
            (b, p, a) => `${p} from ${b} — because good things should be easy.\n\nPerfect for ${a}. Simple, reliable, and just plain great.\n\n→ Try It Now`
        ],
        blog: [
            (b, p, a) => `Let's be honest — ${a} don't have time for complicated products with steep learning curves. That's exactly why ${b} created ${p}: a straightforward, no-nonsense solution that just works.\n\nWe know you've got better things to do than read a 50-page manual, so we'll keep this simple. Here's what ${p} is all about, why we made it, and why we think you'll love it. Grab a coffee and let's dive in.`,
            (b, p, a) => `Sometimes the best things in life are the simplest ones. That's the idea behind ${p} from ${b} — a product built for ${a} who value simplicity, reliability, and a touch of everyday greatness.\n\nNo over-the-top promises, no complicated jargon. Just a genuinely good product that fits seamlessly into your life. Let's talk about what makes ${p} worth your attention.`
        ]
    }
};

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateContent(brand, product, audience, tone) {
    const templates = contentTemplates[tone];
    if (!templates) return null;

    return {
        instagram: pickRandom(templates.instagram)(brand, product, audience),
        email: pickRandom(templates.email)(brand, product, audience),
        ad: pickRandom(templates.ad)(brand, product, audience),
        blog: pickRandom(templates.blog)(brand, product, audience)
    };
}

// ── Form Submission ──
let lastInput = {};

brandForm.addEventListener('submit', (e) => {
    e.preventDefault();

    lastInput = {
        brand: document.getElementById('brand-name').value.trim(),
        product: document.getElementById('product').value.trim(),
        audience: document.getElementById('audience').value.trim(),
        tone: document.getElementById('tone').value
    };

    if (!lastInput.brand || !lastInput.product || !lastInput.audience || !lastInput.tone) return;

    runGeneration();
});

function runGeneration() {
    // Show loading, hide others
    outputSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    inputSection.style.opacity = '0.5';
    inputSection.style.pointerEvents = 'none';

    // Simulate AI processing time
    const delay = 1800 + Math.random() * 1200;

    setTimeout(() => {
        const content = generateContent(lastInput.brand, lastInput.product, lastInput.audience, lastInput.tone);

        // Populate cards
        document.getElementById('instagram-content').textContent = content.instagram;
        document.getElementById('email-content').textContent = content.email;
        document.getElementById('ad-content').textContent = content.ad;
        document.getElementById('blog-content').textContent = content.blog;

        // Hide loading, show results
        loadingSection.classList.add('hidden');
        outputSection.classList.remove('hidden');
        inputSection.style.opacity = '1';
        inputSection.style.pointerEvents = 'auto';

        // Trigger staggered reveal animation
        document.querySelectorAll('.output-card').forEach(card => {
            card.classList.remove('reveal');
            // Force reflow
            void card.offsetWidth;
            card.classList.add('reveal');
        });

        // Smooth scroll to results
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, delay);
}

// ── Regenerate ──
btnRegenerate.addEventListener('click', () => {
    runGeneration();
});

// ── Intersection Observer for fade-in animations ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});
