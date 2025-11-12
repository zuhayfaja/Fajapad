// Ephemeral Scratchpad Application
class EphemeralPad {
    constructor() {
        this.currentMode = 'text';
        this.currentColor = '#000000';
        this.currentTool = 'pen';
        this.brushSize = 2;
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.fadeInterval = null;
        this.canvasHistory = [];
        this.historyIndex = -1;
        this.maxHistory = 20;

        // Space facts collection and tracking
        this.spaceFacts = [
            "The Sun accounts for 99.86% of the mass in our solar system.",
            "One day on Venus is longer than one year on Venus.",
            "Jupiter has at least 79 moons, more than any other planet.",
            "A year on Mercury is just 88 Earth days long.",
            "Saturn's rings are made mostly of ice and rock particles.",
            "The Milky Way galaxy contains between 100-400 billion stars.",
            "Neutron stars are so dense that a teaspoon of their material weighs about 10 million tons.",
            "Black holes can be as small as an atom or as large as millions of suns.",
            "The Andromeda Galaxy is on a collision course with the Milky Way and will merge in about 4.5 billion years.",
            "Light from the Sun takes about 8 minutes to reach Earth.",
            "The International Space Station orbits Earth at about 17,500 mph.",
            "Mars has the largest volcano in the solar system: Olympus Mons, which is 13.6 miles high.",
            "Pluto was reclassified as a dwarf planet in 2006.",
            "The first artificial satellite, Sputnik 1, was launched by the Soviet Union in 1957.",
            "The Hubble Space Telescope has captured images of galaxies over 13 billion light-years away.",
            "A light-year is the distance light travels in one year: about 5.88 trillion miles.",
            "The Great Wall of China is visible from space, but only under perfect conditions.",
            "There are more stars in the universe than grains of sand on all Earth's beaches.",
            "The coldest known place in the universe is the Boomerang Nebula at -458°F.",
            "The hottest known place is the core of the Sun at 27 million°F.",
            "Earth is the only planet known to harbor life.",
            "The Moon is slowly moving away from Earth at about 1.5 inches per year.",
            "Comets are made of ice, dust, and rocky material.",
            "Asteroids are rocky objects that orbit the Sun, mostly between Mars and Jupiter.",
            "The Kuiper Belt contains thousands of icy bodies beyond Neptune.",
            "The Oort Cloud is a hypothetical cloud of icy bodies at the edge of the solar system.",
            "The first human in space was Yuri Gagarin in 1961.",
            "The first woman in space was Valentina Tereshkova in 1963.",
            "Apollo 11 was the first mission to land humans on the Moon in 1969.",
            "The Voyager Golden Record contains sounds and images representing Earth.",
            "The James Webb Space Telescope can see infrared light from the early universe.",
            "Supernovae can outshine entire galaxies for short periods.",
            "Pulsars are rotating neutron stars that emit beams of radiation.",
            "Quasars are extremely bright objects powered by supermassive black holes.",
            "The universe is about 13.8 billion years old.",
            "The Big Bang theory explains the origin of the universe.",
            "Dark matter makes up about 27% of the universe's mass-energy content.",
            "Dark energy makes up about 68% of the universe's mass-energy content.",
            "The observable universe has a diameter of about 93 billion light-years.",
            "The cosmic microwave background is radiation left over from the Big Bang.",
            "The first exoplanet was discovered in 1995 orbiting a sun-like star.",
            "There are more planets than stars in our galaxy.",
            "The TRAPPIST-1 system has seven Earth-sized planets orbiting an ultra-cool dwarf star.",
            "The closest star to our Sun is Proxima Centauri, 4.24 light-years away.",
            "Betelgeuse is a red supergiant star that could explode as a supernova soon.",
            "The Orion Nebula is a stellar nursery where new stars are born.",
            "The Crab Nebula is the remnant of a supernova explosion in 1054 AD.",
            "The Sombrero Galaxy looks like a sombrero due to its thick dust lane.",
            "The Whirlpool Galaxy shows spiral arms caused by gravitational interactions.",
            "The Large Magellanic Cloud is a satellite galaxy of the Milky Way.",
            "The Small Magellanic Cloud is another satellite galaxy of the Milky Way.",
            "The Magellanic Clouds are visible from the Southern Hemisphere.",
            "The Pillars of Creation are massive columns of gas and dust in the Eagle Nebula.",
            "The Horsehead Nebula is a dark nebula that blocks light from behind it.",
            "The Ring Nebula is a planetary nebula that looks like a smoke ring.",
            "The Helix Nebula is a planetary nebula that resembles a giant eye.",
            "The Cat's Eye Nebula shows concentric shells of gas ejected by a dying star.",
            "The Eskimo Nebula has a bright central star surrounded by gas shells.",
            "The Dumbbell Nebula is a planetary nebula shaped like a dumbbell.",
            "The Butterfly Nebula has bipolar lobes that look like butterfly wings.",
            "The Ant Nebula has lobes that resemble ant mandibles.",
            "The Retina Nebula appears as a cosmic eye with a dark spot.",
            "The Saturn Nebula has rings similar to Saturn's.",
            "The Hourglass Nebula has a distinctive hourglass shape.",
            "The Red Rectangle Nebula has a rectangular shape with red colors.",
            "The Blue Snowball Nebula is small and very blue.",
            "The Rotten Egg Nebula smells like rotten eggs due to sulfur compounds.",
            "The Stingray Nebula has a shape resembling a stingray.",
            "The Medusa Nebula has tentacle-like structures.",
            "The Soap Bubble Nebula is large and very faint.",
            "The Southern Ring Nebula is similar to the Ring Nebula but in the south.",
            "The Eight-Burst Nebula has eight bubbles of gas.",
            "The Necklace Nebula has bright knots that look like beads.",
            "The Water Lily Nebula has petal-like structures.",
            "The Calabash Nebula resembles a calabash gourd.",
            "The Phantom Streak Nebula has a long, thin shape.",
            "The Galaxy NGC 1300 has a prominent bar of stars across its center.",
            "The Cigar Galaxy (M82) is undergoing intense star formation.",
            "The Pinwheel Galaxy (M101) has prominent spiral arms.",
            "The Sunflower Galaxy has spiral arms that look like sunflower petals.",
            "The Black Eye Galaxy has a dark dust lane that looks like a black eye.",
            "The Mice Galaxies are colliding and creating tidal tails.",
            "The Antennae Galaxies are two galaxies in the process of merging.",
            "The Tadpole Galaxy has a long tidal tail from a recent interaction.",
            "The Cartwheel Galaxy has a ring of star formation from a collision.",
            "The Bullet Cluster shows evidence of dark matter through gravitational lensing.",
            "Gravitational waves were first detected in 2015 from merging black holes.",
            "The Event Horizon Telescope captured the first image of a black hole in 2019.",
            "The black hole at the center of M87 is 6.5 billion times the Sun's mass.",
            "Sagittarius A* is the supermassive black hole at the center of the Milky Way.",
            "The fastest spinning pulsar rotates 716 times per second.",
            "Magnetars have magnetic fields a thousand times stronger than typical neutron stars.",
            "White dwarfs are the remnants of stars like our Sun after they exhaust their fuel.",
            "Brown dwarfs are 'failed stars' that never ignited hydrogen fusion.",
            "Red dwarfs are the most common type of star in the universe.",
            "Blue giants are hot, luminous stars that burn through their fuel quickly.",
            "Cepheids are pulsating stars used to measure distances in astronomy.",
            "RR Lyrae stars are another type of pulsating star used for distance measurement.",
            "Novae are explosions on the surface of white dwarfs in binary systems.",
            "Dwarf novae are similar but less energetic than classical novae.",
            "Symbiotic stars are binary systems with a hot companion heating a cool giant.",
            "Wolf-Rayet stars are extremely hot stars with strong stellar winds.",
            "Luminous blue variables are unstable, very bright blue stars.",
            "Herbig-Haro objects are bright patches where jets from young stars collide with gas.",
            "Protostars are young stars still gathering mass from their surroundings.",
            "T Tauri stars are pre-main-sequence stars that haven't reached the main sequence yet.",
            "The Pleiades star cluster is visible to the naked eye and contains hot, blue stars.",
            "The Hyades cluster is the nearest open cluster to Earth.",
            "Globular clusters contain hundreds of thousands of stars in spherical distributions.",
            "The Hercules Cluster contains about 160 galaxies.",
            "The Coma Cluster is one of the largest known galaxy clusters.",
            "The Bullet Cluster shows evidence of dark matter through gravitational lensing.",
            "The universe's expansion is accelerating due to dark energy.",
            "The cosmic web consists of filaments of galaxies separated by vast voids.",
            "The Sloan Great Wall is a gigantic structure of galaxies spanning 1.37 billion light-years.",
            "The BOSS Great Wall is an even larger structure discovered in 2013.",
            "The universe has been expanding since the Big Bang 13.8 billion years ago.",
            "The first stars formed about 100-200 million years after the Big Bang.",
            "The first galaxies formed about 500 million years after the Big Bang.",
            "Reionization occurred when the first stars and galaxies ionized the universe's hydrogen.",
            "The Gunn-Peterson trough shows evidence of reionization in distant quasars.",
            "The Lyman-alpha forest reveals the distribution of intergalactic gas.",
            "The 21-centimeter line can be used to study the early universe.",
            "Fast radio bursts are mysterious, extremely energetic radio pulses.",
            "Gamma-ray bursts are the most energetic explosions in the universe.",
            "Solar flares are sudden flashes of increased brightness on the Sun.",
            "Coronal mass ejections are huge bubbles of coronal plasma ejected from the Sun.",
            "Auroras occur when charged particles from the Sun interact with Earth's magnetic field.",
            "The Van Allen radiation belts are zones of charged particles around Earth.",
            "The heliosphere is the bubble of solar wind that surrounds our solar system.",
            "The termination shock is where the solar wind slows as it meets interstellar medium.",
            "The heliopause is the boundary where the solar wind meets interstellar space.",
            "Voyager 1 crossed the heliopause in 2012, entering interstellar space.",
            "Voyager 2 crossed the heliopause in 2018.",
            "The Pioneer plaques and Voyager Golden Records are messages to potential extraterrestrial civilizations.",
            "SETI (Search for Extraterrestrial Intelligence) uses radio telescopes to listen for signals.",
            "The Drake equation estimates the number of communicative civilizations in the galaxy.",
            "The Fermi paradox questions why we haven't found evidence of extraterrestrial civilizations.",
            "The habitable zone is the region around a star where liquid water can exist.",
            "Europa, one of Jupiter's moons, may have a subsurface ocean.",
            "Enceladus, a moon of Saturn, has geysers erupting from its south pole.",
            "Titan, Saturn's largest moon, has lakes of liquid methane.",
            "Io, Jupiter's innermost moon, is the most volcanically active body in the solar system.",
            "Ganymede is the largest moon in the solar system, bigger than Mercury.",
            "Callisto is the most heavily cratered object in the solar system.",
            "Triton, Neptune's largest moon, orbits in the opposite direction of Neptune's rotation.",
            "Charon, Pluto's largest moon, is so large that Pluto-Charon is sometimes considered a double planet.",
            "The Moon's far side was first photographed by Luna 3 in 1959.",
            "The Apollo program brought 382 kg of Moon rocks back to Earth.",
            "The Chang'e missions are China's lunar exploration program.",
            "India's Chandrayaan-2 mission attempted to land on the Moon's south pole.",
            "Japan's SLIM mission achieved the most precise lunar landing in 2023.",
            "The Artemis program aims to return humans to the Moon by 2025.",
            "The Lunar Gateway will be a space station in lunar orbit.",
            "Mars rovers have traveled over 50 km on the Martian surface.",
            "The Perseverance rover is searching for signs of ancient life on Mars.",
            "The Ingenuity helicopter made the first powered flight on another planet.",
            "The James Webb Space Telescope is the largest space telescope ever built.",
            "The Chandra X-ray Observatory studies high-energy phenomena in the universe.",
            "The Spitzer Space Telescope studied infrared light from space.",
            "The Kepler space telescope discovered thousands of exoplanets.",
            "The TESS mission is surveying the entire sky for exoplanets.",
            "The PLATO mission will search for Earth-like planets around bright stars.",
            "The CHEOPS mission studies known exoplanets in detail.",
            "The Ariel mission will study exoplanet atmospheres.",
            "The Nancy Grace Roman Space Telescope will study dark energy and exoplanets.",
            "The Euclid mission will study dark matter and dark energy.",
            "The Rubin Observatory will conduct the Legacy Survey of Space and Time.",
            "The Square Kilometre Array will be the world's largest radio telescope.",
            "The Event Horizon Telescope network spans the entire Earth.",
            "Gravitational wave detectors like LIGO have opened a new window on the universe.",
            "Neutrino observatories like IceCube study high-energy particles from space.",
            "Cosmic rays are high-energy particles from outside our solar system.",
            "The Pierre Auger Observatory studies ultra-high-energy cosmic rays.",
            "The Sudbury Neutrino Observatory studies solar neutrinos.",
            "The Borexino experiment studies low-energy solar neutrinos.",
            "The Kamioka Liquid Scintillator Antineutrino Detector studies neutrinos.",
            "The Super-Kamiokande detector is the world's largest neutrino detector.",
            "The Hyper-Kamiokande will be even larger and study proton decay.",
            "The Large Hadron Collider studies particle physics at the energy of the early universe.",
            "The International Linear Collider is planned to study Higgs boson properties.",
            "The Compact Linear Collider is another proposed particle accelerator.",
            "The Future Circular Collider could be built in the LHC tunnel.",
            "The Muon g-2 experiment studies the magnetic moment of muons.",
            "The Belle II experiment studies CP violation in B meson decays.",
            "The LHCb experiment studies matter-antimatter asymmetry.",
            "The ATLAS and CMS experiments discovered the Higgs boson.",
            "The ALICE experiment studies quark-gluon plasma.",
            "The TOTEM experiment measures the size of protons.",
            "The MoEDAL experiment searches for magnetic monopoles.",
            "The FASER experiment studies neutrinos at the LHC.",
            "The SND@LHC experiment studies neutrinos at the LHC.",
            "The LHCf experiment studies cosmic rays using LHC beams.",
            "The AWAKE experiment studies plasma wakefield acceleration.",
            "The HiLumi LHC will increase the LHC's luminosity.",
            "The High-Luminosity LHC will produce more Higgs bosons and search for new physics.",
            "The Space Shuttle program flew 135 missions over 30 years.",
            "The Space Shuttle Endeavour's final mission was STS-134 in 2011.",
            "The Space Shuttle Atlantis's final mission was STS-135 in 2011.",
            "The Space Shuttle Discovery's final mission was STS-133 in 2011.",
            "The Space Shuttle Endeavour flew 25 missions.",
            "The Space Shuttle Atlantis flew 33 missions.",
            "The Space Shuttle Discovery flew 39 missions.",
            "The Space Shuttle Columbia was lost during reentry in 2003.",
            "The Space Shuttle Challenger exploded 73 seconds after launch in 1986.",
            "The Commercial Crew Program will take astronauts to the ISS.",
            "SpaceX's Crew Dragon carried astronauts to the ISS in 2020.",
            "Boeing's Starliner had its first crewed flight in 2024.",
            "The Orion spacecraft will carry astronauts to the Moon and Mars.",
            "The Space Launch System is the most powerful rocket ever built.",
            "The Falcon Heavy can lift 64 tons to low Earth orbit.",
            "The Starship/Super Heavy system aims to make humanity multiplanetary.",
            "The New Glenn rocket will compete with Falcon 9 and Atlas V.",
            "The Vulcan Centaur rocket will replace Atlas V and Delta IV.",
            "The Ariane 6 rocket will continue Europe's access to space.",
            "The Long March 5 is China's most powerful rocket.",
            "The H3 rocket is Japan's new heavy-lift launch vehicle.",
            "The Angara rocket family will replace Russian Proton and Zenit rockets.",
            "The Electron rocket can place 300 kg in low Earth orbit.",
            "The Rocket Lab Photon satellite bus enables complex missions.",
            "The Astra Rocket 3.3 reached orbit in 2021.",
            "The Firefly Alpha reached orbit in 2021.",
            "The Terran 1 rocket failed on its first launch in 2023.",
            "The LauncherOne air-launched rocket reached orbit in 2021.",
            "The RS1 rocket reached orbit in 2023.",
            "The Prime rocket is in development by Firefly Aerospace.",
            "The Neutron rocket is in development by Rocket Lab.",
            "The Terran R rocket is in development by Relativity Space.",
            "The New Line 1 rocket is in development by Astra.",
            "The Zephyr rocket is in development by Rocket Lab.",
            "The Astra Spacecraft is a small satellite bus.",
            "The Harbinger satellite is a small satellite bus.",
            "The Sherpa satellite is a small satellite bus.",
            "The Lion satellite is a small satellite bus.",
            "The Roadster satellite is a small satellite bus.",
            "The Starlink constellation will provide global internet.",
            "The OneWeb constellation will provide global internet.",
            "The Iridium NEXT constellation provides satellite phones.",
            "The Globalstar constellation provides satellite phones.",
            "The Orbcomm constellation provides IoT connectivity.",
            "The Inmarsat constellation provides maritime and aviation communications.",
            "The Intelsat constellation provides television broadcasting.",
            "The Eutelsat constellation provides television broadcasting.",
            "The SES constellation provides television broadcasting.",
            "The Telesat constellation provides television broadcasting.",
            "The Viasat constellation provides broadband internet.",
            "The HughesNet constellation provides broadband internet."
        ]

        // DOM elements
        this.body = document.body;
        this.durationSelect = document.getElementById('duration');
        this.customHoursInput = document.getElementById('customHours');
        this.themeToggle = document.getElementById('themeToggle');
        this.modeToggle = document.getElementById('modeToggle');
        this.textContainer = document.getElementById('textContainer');
        this.canvasContainer = document.getElementById('canvasContainer');
        this.textArea = document.getElementById('textArea');
        this.canvas = document.getElementById('canvas');
        this.colorBtns = document.querySelectorAll('.color-btn');
        this.colorPicker = document.getElementById('colorPicker');
        this.fadeNotice = document.getElementById('fadeNotice');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.countdownTimer = document.getElementById('countdownTimer');

        // Canvas context
        this.ctx = this.canvas.getContext('2d');

        // Space facts tracking
        this.shownFacts = new Set();
        this.lastFactTime = 0;

        this.init();
    }

    init() {
        try {
            this.setupCanvas();
            this.loadData();
            this.setupEventListeners();
            this.startFadeTimer();
            this.updateUI();
            this.checkAndShowWelcomeModal();
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError('Failed to initialize the application. Please refresh the page.');
        }
    }

    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = this.currentColor;
        this.ctx.lineWidth = this.brushSize;

        // Apply performance optimizations
        this.optimizeCanvas();
    }

    setupEventListeners() {
        // Duration change
        this.durationSelect.addEventListener('change', () => this.handleDurationChange());
        this.customHoursInput.addEventListener('input', () => this.handleCustomHoursChange());

        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Mode toggle
        this.modeToggle.addEventListener('click', () => {
            const newMode = this.currentMode === 'text' ? 'scribble' : 'text';
            // Update text immediately like theme button
            this.modeToggle.textContent = newMode === 'text' ? '📝 Text' : '🎨 Draw';
            this.switchMode(newMode);
        });

        // Text area (debounced save)
        const debouncedSaveText = this.debounce(() => this.saveTextData(), 300);
        this.textArea.addEventListener('input', debouncedSaveText);

        // Color controls
        this.colorBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setColor(btn.dataset.color));
        });
        this.colorPicker.addEventListener('input', () => this.setColor(this.colorPicker.value));

        // Undo/Redo controls
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');
        if (undoBtn) undoBtn.addEventListener('click', () => this.undo());
        if (redoBtn) redoBtn.addEventListener('click', () => this.redo());

        // Export controls
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportContent());

        // Clear canvas
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearCanvas());

        // Background controls
        this.backgroundSelect = document.getElementById('backgroundSelect');
        this.currentBackground = 'white';
        if (this.backgroundSelect) {
            this.backgroundSelect.addEventListener('change', () => this.setBackground(this.backgroundSelect.value));
        }

        // Tool controls (both full and mini)
        const toolBtns = document.querySelectorAll('.tool-btn');
        toolBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setTool(btn.dataset.tool));
        });

        // Brush size control
        const brushSizeSlider = document.getElementById('brushSize');
        const brushSizeValue = document.getElementById('brushSizeValue');
        brushSizeSlider.addEventListener('input', (e) => {
            this.brushSize = parseInt(e.target.value);
            brushSizeValue.textContent = this.brushSize + 'px';
            this.ctx.lineWidth = this.brushSize;
        });

        // Throttled canvas persistence
        this.saveCanvasDataThrottled = this.throttle(() => this.saveCanvasData(), 250);

        // Canvas events
        this.canvas.addEventListener('mousedown', (e) => { this.updateBrushPreview(e); this.startDrawing(e); this.resetAutoHide(); });
        this.canvas.addEventListener('mousemove', (e) => { this.updateBrushPreview(e); this.draw(e); });
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => { this.stopDrawing(); this.hideBrushPreview(); });
        this.canvas.addEventListener('mouseenter', (e) => { this.updateBrushPreview(e); this.showBrushPreview(); });

    // Touch events for mobile
    this.canvas.addEventListener('touchstart', (e) => { this.showBrushPreview(); this.handleTouchStart(e); this.resetAutoHide(); }, { passive: false });
    this.canvas.addEventListener('touchmove', (e) => { this.updateBrushPreview(e); this.handleTouchMove(e); }, { passive: false });
    this.canvas.addEventListener('touchend', (e) => { this.hideBrushPreview(); this.handleTouchEnd(e); }, { passive: false });

        // Window resize
        window.addEventListener('resize', () => {
            if (this.currentMode === 'scribble') {
                this.setupCanvas();
                this.loadCanvasData();
            }
            // Always reposition toolbar on resize to ensure it's visible
            this.repositionToolbar();
        });

        // ResizeObserver to preserve canvas content on container resize
        if (this.canvasContainer) {
            const ro = new ResizeObserver(() => {
                if (this.currentMode === 'scribble') {
                    const snapshot = this.canvas.toDataURL('image/png');
                    this.setupCanvas();
                    const img = new Image();
                    img.onload = () => this.ctx.drawImage(img, 0, 0);
                    img.src = snapshot;
                }
            });
            ro.observe(this.canvasContainer);
        }

        // Menu toggle
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Floating toolbar drag functionality
        this.setupFloatingToolbarDrag();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Performance monitoring
        this.performanceMonitor = {
            startTime: Date.now(),
            operations: 0,
            lastCleanup: Date.now()
        };
    }

    // Space facts functionality
    isPresetTimer(duration) {
        // Check if duration is one of the preset values (not custom)
        return [1, 6, 12, 24, 48, 168].includes(duration);
    }

    checkAndShowSpaceFact(timestamp, duration, elapsed) {
        const currentTime = Date.now();
        const factInterval = this.getFactInterval(duration); // Get interval based on timer duration

        // Check if enough time has passed since last fact
        if (currentTime - this.lastFactTime >= factInterval) {
            this.showSpaceFact();
            this.lastFactTime = currentTime;
        }
    }

    getFactInterval(duration) {
        // Different intervals based on timer duration
        if (duration <= 6) return 5 * 60 * 1000; // 5 minutes for short timers
        if (duration <= 24) return 10 * 60 * 1000; // 10 minutes for medium timers
        return 15 * 60 * 1000; // 15 minutes for long timers
    }

    showSpaceFact() {
        // Get available facts (not shown yet)
        const availableFacts = this.spaceFacts.filter((_, index) => !this.shownFacts.has(index));

        // If all facts shown, reset and start over
        if (availableFacts.length === 0) {
            this.shownFacts.clear();
            // Add all facts back as available
            for (let i = 0; i < this.spaceFacts.length; i++) {
                // Keep a few recent ones out to avoid immediate repeats
                if (i < this.spaceFacts.length - 5) {
                    // This fact is available again
                }
            }
            // Reset available facts
            const allIndices = Array.from({ length: this.spaceFacts.length }, (_, i) => i);
            const shuffled = this.shuffleArray(allIndices);
            // Keep first 10 as "recently shown" to avoid repeats
            shuffled.slice(10).forEach(index => this.shownFacts.delete(index));
        }

        // Get available indices
        const availableIndices = Array.from({ length: this.spaceFacts.length }, (_, i) => i)
            .filter(i => !this.shownFacts.has(i));

        if (availableIndices.length === 0) {
            // If still no available facts, just pick a random one
            const randomIndex = Math.floor(Math.random() * this.spaceFacts.length);
            this.displayFact(this.spaceFacts[randomIndex]);
            return;
        }

        // Pick random available fact
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        this.shownFacts.add(randomIndex);
        this.displayFact(this.spaceFacts[randomIndex]);
    }

    displayFact(fact) {
        // Update footer fact display
        const factTextElement = document.getElementById('currentSpaceFact');
        if (factTextElement) {
            // Add fade out animation
            factTextElement.style.opacity = '0';
            factTextElement.style.transform = 'translateY(10px)';

            setTimeout(() => {
                factTextElement.textContent = fact;
                factTextElement.style.opacity = '1';
                factTextElement.style.transform = 'translateY(0)';
            }, 200);
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Duration handling
    handleDurationChange() {
        if (this.durationSelect.value === 'custom') {
            this.customHoursInput.style.display = 'inline-block';
            this.customHoursInput.focus();
        } else {
            this.customHoursInput.style.display = 'none';
            this.saveData();
        }
    }

    handleCustomHoursChange() {
        this.saveData();
    }

    getCurrentDuration() {
        if (this.durationSelect.value === 'custom') {
            const hours = parseFloat(this.customHoursInput.value);
            return isNaN(hours) || hours <= 0 ? 24 : hours;
        }
        return parseFloat(this.durationSelect.value);
    }

    // Theme toggle
    toggleTheme() {
        this.body.classList.toggle('light');
        this.body.classList.toggle('dark');
        const isDark = this.body.classList.contains('dark');
        this.themeToggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
        this.saveData();
    }

    // Menu toggle
    toggleMenu() {
        const toolbar = document.querySelector('.toolbar');
        const menuToggle = document.getElementById('menuToggle');

        if (toolbar.classList.contains('collapsed')) {
            toolbar.classList.remove('collapsed');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            toolbar.classList.add('collapsed');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Floating toolbar drag functionality
    setupFloatingToolbarDrag() {
        const toolbar = document.getElementById('floatingToolbar');
        if (!toolbar) return;

        const dragHandle = toolbar.querySelector('.toolbar-drag-handle');
        if (!dragHandle) return;

        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let toolbarStartX = 0;
        let toolbarStartY = 0;
        let autoHideTimeout = null;

        const handleStart = (e) => {
            // Only start drag if initiating from the drag handle
            if (!e.target.closest('.toolbar-drag-handle')) return;

            isDragging = true;
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            dragStartX = clientX;
            dragStartY = clientY;

            const rect = toolbar.getBoundingClientRect();
            toolbarStartX = rect.left;
            toolbarStartY = rect.top;

            toolbar.style.cursor = 'grabbing';
            toolbar.style.userSelect = 'none';
            toolbar.classList.add('dragging');

            this.clearAutoHide();
            e.preventDefault();
        };

        const handleMove = (e) => {
            if (!isDragging) return;

            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            const deltaX = clientX - dragStartX;
            const deltaY = clientY - dragStartY;

            let newLeft = toolbarStartX + deltaX;
            let newTop = toolbarStartY + deltaY;

            // Constrain to viewport bounds
            const rect = toolbar.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            newLeft = Math.max(0, Math.min(newLeft, viewportWidth - rect.width));
            newTop = Math.max(64, Math.min(newTop, viewportHeight - rect.height - 100));

            toolbar.style.left = `${newLeft}px`;
            toolbar.style.top = `${newTop}px`;
            toolbar.style.right = 'auto';
            toolbar.style.bottom = 'auto';

            e.preventDefault();
        };

        const handleEnd = () => {
            if (isDragging) {
                isDragging = false;
                toolbar.style.cursor = 'move';
                toolbar.style.userSelect = '';
                toolbar.classList.remove('dragging');

                this.saveToolbarPosition();
                this.startAutoHide();
            }
        };

        // Mouse events: restrict start to handle only
        dragHandle.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);

        // Touch events: restrict start to handle only
        dragHandle.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd, { passive: false });

        // Hover events for auto-hide remain on toolbar
        toolbar.addEventListener('mouseenter', () => {
            if (toolbar.classList.contains('mini')) {
                // Expand from mini to full toolbar
                toolbar.classList.remove('mini');
                toolbar.classList.add('active');
                this.clearAutoHide();
                this.startAutoHide();
            } else {
                toolbar.classList.add('active');
                this.clearAutoHide();
            }
        });

        toolbar.addEventListener('mouseleave', () => {
            this.startAutoHide();
        });

        // Click outside to expand mini toolbar
        document.addEventListener('click', (e) => {
            if (toolbar.classList.contains('mini') && !toolbar.contains(e.target)) {
                toolbar.classList.remove('mini');
                toolbar.classList.add('active');
                this.clearAutoHide();
                this.startAutoHide();
            }
        });

        this.loadToolbarPosition();
        this.startAutoHide();
    }

    startAutoHide() {
        const toolbar = document.getElementById('floatingToolbar');
        if (!toolbar) return;

        this.clearAutoHide();
        this.autoHideTimeout = setTimeout(() => {
            // Same mini-pill behavior in both modes
            toolbar.classList.remove('active');
            toolbar.classList.add('mini');
            this.dockToNearestSide();
        }, 3000); // Hide after 3 seconds of inactivity
    }

    clearAutoHide() {
        if (this.autoHideTimeout) {
            clearTimeout(this.autoHideTimeout);
            this.autoHideTimeout = null;
        }
    }

    resetAutoHide() {
        this.clearAutoHide();
        this.startAutoHide();
    }

    dockToNearestSide() {
        const toolbar = document.getElementById('floatingToolbar');
        if (!toolbar) return;

        const rect = toolbar.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate distances to each edge
        const distToLeft = centerX;
        const distToRight = viewportWidth - centerX;
        const distToTop = centerY;
        const distToBottom = viewportHeight - centerY;

        // Find the minimum distance
        const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

        let newLeft, newTop;

        if (minDist === distToLeft) {
            // Dock to left
            newLeft = 0;
            newTop = Math.max(64, Math.min(centerY - rect.height / 2, viewportHeight - rect.height - 100));
        } else if (minDist === distToRight) {
            // Dock to right
            newLeft = viewportWidth - rect.width;
            newTop = Math.max(64, Math.min(centerY - rect.height / 2, viewportHeight - rect.height - 100));
        } else if (minDist === distToTop) {
            // Dock to top
            newLeft = Math.max(0, Math.min(centerX - rect.width / 2, viewportWidth - rect.width));
            newTop = 64;
        } else {
            // Dock to bottom
            newLeft = Math.max(0, Math.min(centerX - rect.width / 2, viewportWidth - rect.width));
            newTop = viewportHeight - rect.height - 100;
        }

        toolbar.style.left = `${newLeft}px`;
        toolbar.style.top = `${newTop}px`;
        toolbar.style.right = 'auto';
        toolbar.style.bottom = 'auto';
    }

    saveToolbarPosition() {
        const toolbar = document.getElementById('floatingToolbar');
        if (!toolbar) return;

        const rect = toolbar.getBoundingClientRect();
        const position = {
            left: rect.left,
            top: rect.top
        };

        try {
            localStorage.setItem('floating_toolbar_position', JSON.stringify(position));
        } catch (error) {
            console.error('Failed to save toolbar position:', error);
        }
    }

    loadToolbarPosition() {
        const toolbar = document.getElementById('floatingToolbar');
        if (!toolbar) return;

        try {
            const saved = localStorage.getItem('floating_toolbar_position');
            if (saved) {
                const position = JSON.parse(saved);
                // Validate position before applying
                if (this.isValidToolbarPosition(position.left, position.top)) {
                    toolbar.style.left = `${position.left}px`;
                    toolbar.style.top = `${position.top}px`;
                    toolbar.style.right = 'auto';
                    toolbar.style.bottom = 'auto';
                } else {
                    // Position is invalid, use default
                    this.setDefaultToolbarPosition();
                }
            } else {
                // No saved position, use default
                this.setDefaultToolbarPosition();
            }
        } catch (error) {
            console.error('Failed to load toolbar position:', error);
            this.setDefaultToolbarPosition();
        }
    }

    repositionToolbar() {
        const toolbar = document.getElementById('floatingToolbar');
        if (!toolbar || toolbar.style.display === 'none') return;

        const rect = toolbar.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Check if toolbar is within viewport bounds
        const isOutOfBounds =
            rect.left < 0 ||
            rect.top < 64 ||
            rect.right > viewportWidth ||
            rect.bottom > viewportHeight - 100;

        if (isOutOfBounds) {
            // Toolbar is out of bounds, reposition it
            let newLeft = rect.left;
            let newTop = rect.top;

            // Adjust horizontal position
            if (rect.left < 0) {
                newLeft = 0;
            } else if (rect.right > viewportWidth) {
                newLeft = viewportWidth - rect.width;
            }

            // Adjust vertical position
            if (rect.top < 64) {
                newTop = 64;
            } else if (rect.bottom > viewportHeight - 100) {
                newTop = viewportHeight - rect.height - 100;
            }

            // Ensure minimum bounds
            newLeft = Math.max(0, Math.min(newLeft, viewportWidth - rect.width));
            newTop = Math.max(64, Math.min(newTop, viewportHeight - rect.height - 100));

            toolbar.style.left = `${newLeft}px`;
            toolbar.style.top = `${newTop}px`;
            toolbar.style.right = 'auto';
            toolbar.style.bottom = 'auto';

            // Save the corrected position
            this.saveToolbarPosition();
        }
    }

    isValidToolbarPosition(left, top) {
        const toolbar = document.getElementById('floatingToolbar');
        if (!toolbar) return false;

        const rect = toolbar.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        return left >= 0 &&
               top >= 64 &&
               left + rect.width <= viewportWidth &&
               top + rect.height <= viewportHeight - 100;
    }

    setDefaultToolbarPosition() {
        const toolbar = document.getElementById('floatingToolbar');
        if (!toolbar) return;

        // Default position: bottom right, accounting for footer
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const rect = toolbar.getBoundingClientRect();

        const defaultLeft = viewportWidth - rect.width - 24;
        const defaultTop = viewportHeight - rect.height - 120; // Above footer

        toolbar.style.left = `${Math.max(0, defaultLeft)}px`;
        toolbar.style.top = `${Math.max(64, defaultTop)}px`;
        toolbar.style.right = 'auto';
        toolbar.style.bottom = 'auto';
    }

    toggleFloatingToolbar() {
        const toolbar = document.getElementById('floatingToolbar');
        if (!toolbar) return;

        if (toolbar.classList.contains('active')) {
            toolbar.classList.remove('active');
            this.startAutoHide();
        } else {
            toolbar.classList.add('active');
            this.clearAutoHide();
        }
    }

    // Mode switching
    switchMode(mode) {
        this.currentMode = mode;

        const toolbar = document.getElementById('floatingToolbar');
        const drawingTools = document.getElementById('drawingTools');
        const drawingTools2 = document.getElementById('drawingTools2');
        const brushControls = document.getElementById('brushControls');
        const exportControls = document.getElementById('exportControls');

        // Toolbar is always visible with same behavior in both modes
        if (toolbar) {
            toolbar.style.display = 'block';
            toolbar.classList.remove('mini');
            toolbar.classList.add('active');
            this.clearAutoHide();
            this.startAutoHide();
        }

        if (mode === 'text') {
            this.textContainer.style.display = 'block';
            this.canvasContainer.style.display = 'none';
            drawingTools.style.display = 'none';
            drawingTools2.style.display = 'none';
            brushControls.style.display = 'none';
            exportControls.style.display = 'block';
            this.textArea.focus();
        } else {
            this.textContainer.style.display = 'none';
            this.canvasContainer.style.display = 'block';
            drawingTools.style.display = 'block';
            drawingTools2.style.display = 'block';
            brushControls.style.display = 'block';
            exportControls.style.display = 'block';
            this.setupCanvas();
            this.loadCanvasData();
            this.setTool(this.currentTool); // Apply current tool setting
        }

        // Update export button label based on mode
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.textContent = mode === 'text' ? '💾 Save TXT' : '💾 Save PNG';
            exportBtn.setAttribute('aria-label', mode === 'text' ? 'Export current text as TXT' : 'Export current drawing as PNG');
        }

        this.saveData();
    }

    // Color handling
    setColor(color) {
        this.currentColor = color;
        this.colorPicker.value = color;
        this.ctx.strokeStyle = color;
        this.textArea.style.color = color;
        this.saveData();
    }

    // Tool handling
    setTool(tool) {
        this.currentTool = tool;
        const toolBtns = document.querySelectorAll('.tool-btn');
        toolBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tool === tool);
        });

        if (tool === 'eraser') {
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.strokeStyle = 'rgba(0,0,0,1)';
            this.ctx.lineWidth = Math.max(this.brushSize * 2, 8); // Eraser is 2x pen size, minimum 8px
            this.canvas.classList.add('eraser-cursor');
            this.canvas.classList.remove('pen-cursor');
        } else {
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.strokeStyle = this.currentColor;
            this.ctx.lineWidth = this.brushSize;
            this.canvas.classList.add('pen-cursor');
            this.canvas.classList.remove('eraser-cursor');
        }
    }

    // Text handling
    saveTextData() {
        this.saveData();
    }

    // Canvas drawing
    startDrawing(e) {
        this.isDrawing = true;
        [this.lastX, this.lastY] = this.getCanvasCoordinates(e);
        // Save state before starting to draw
        this.saveCanvasState();
    }

    draw(e) {
        if (!this.isDrawing) return;
        const [x, y] = this.getCanvasCoordinates(e);

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        [this.lastX, this.lastY] = [x, y];
        this.saveCanvasDataThrottled();
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    // Undo/Redo functionality
    saveCanvasState() {
        // Save current canvas state
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        // Remove any history after current index (for when user draws after undo)
        this.canvasHistory = this.canvasHistory.slice(0, this.historyIndex + 1);

        // Add new state
        this.canvasHistory.push(imageData);

        // Limit history size
        if (this.canvasHistory.length > this.maxHistory) {
            this.canvasHistory.shift();
        } else {
            this.historyIndex++;
        }

        this.updateUndoRedoButtons();
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreCanvasState();
            this.updateUndoRedoButtons();
        }
    }

    redo() {
        if (this.historyIndex < this.canvasHistory.length - 1) {
            this.historyIndex++;
            this.restoreCanvasState();
            this.updateUndoRedoButtons();
        }
    }

    restoreCanvasState() {
        if (this.canvasHistory[this.historyIndex]) {
            this.ctx.putImageData(this.canvasHistory[this.historyIndex], 0, 0);
            this.saveCanvasData(); // Save the restored state
        }
    }

    updateUndoRedoButtons() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');

        if (undoBtn) {
            undoBtn.disabled = this.historyIndex <= 0;
        }
        if (redoBtn) {
            redoBtn.disabled = this.historyIndex >= this.canvasHistory.length - 1;
        }
    }

    clearCanvas() {
        // Save current state before clearing so it can be undone
        this.saveCanvasState();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.saveCanvasData(); // Save the cleared state
    }

    clearCanvasHistory() {
        this.canvasHistory = [];
        this.historyIndex = -1;
        this.updateUndoRedoButtons();
    }

    // Export functionality
    exportContent() {
        try {
            if (this.currentMode === 'text') {
                this.exportText();
            } else {
                this.exportCanvas();
            }
        } catch (error) {
            console.error('Export failed:', error);
            this.showError('Failed to export content. Please try again.');
        }
    }

    exportCanvas() {
        // Create a temporary canvas to export with configurable background
        const exportCanvas = document.createElement('canvas');
        const exportCtx = exportCanvas.getContext('2d');

        exportCanvas.width = this.canvas.width;
        exportCanvas.height = this.canvas.height;

        // Fill background based on selection
        if (this.currentBackground === 'white') {
            exportCtx.fillStyle = '#ffffff';
            exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
        } else if (this.currentBackground === 'grid') {
            exportCtx.fillStyle = '#ffffff';
            exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
            exportCtx.strokeStyle = 'rgba(0,0,0,0.08)';
            exportCtx.lineWidth = 1;
            const size = 16;
            for (let x = 0; x < exportCanvas.width; x += size) {
                exportCtx.beginPath();
                exportCtx.moveTo(x + 0.5, 0);
                exportCtx.lineTo(x + 0.5, exportCanvas.height);
                exportCtx.stroke();
            }
            for (let y = 0; y < exportCanvas.height; y += size) {
                exportCtx.beginPath();
                exportCtx.moveTo(0, y + 0.5);
                exportCtx.lineTo(exportCanvas.width, y + 0.5);
                exportCtx.stroke();
            }
        } // transparent: no background fill

        // Draw the current canvas content
        exportCtx.drawImage(this.canvas, 0, 0);

        // Create download link
        const link = document.createElement('a');
        link.download = `ephemeral-drawing-${new Date().toISOString().split('T')[0]}.png`;
        link.href = exportCanvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    exportText() {
        const text = this.textArea.value;
        if (!text.trim()) {
            this.showError('No text to export.');
            return;
        }

        // Create blob with text content
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

        // Create download link
        const link = document.createElement('a');
        link.download = `ephemeral-text-${new Date().toISOString().split('T')[0]}.txt`;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the object URL
        URL.revokeObjectURL(link.href);
    }

    getCanvasCoordinates(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        let x, y;
        if (e.touches) {
            x = (e.touches[0].clientX - rect.left) * scaleX;
            y = (e.touches[0].clientY - rect.top) * scaleY;
        } else {
            x = (e.clientX - rect.left) * scaleX;
            y = (e.clientY - rect.top) * scaleY;
        }

        return [x, y];
    }

    handleTouchStart(e) {
        e.preventDefault();
        this.startDrawing(e);
    }

    handleTouchMove(e) {
        e.preventDefault();
        this.draw(e);
    }

    handleTouchEnd(e) {
        e.preventDefault();
        this.stopDrawing();
    }

    // Data persistence with error handling
    saveData() {
        try {
            const data = {
                mode: this.currentMode,
                duration: this.getCurrentDuration(),
                theme: this.body.classList.contains('dark') ? 'dark' : 'light',
                color: this.currentColor,
                timestamp: Date.now()
            };

            if (this.currentMode === 'text') {
                data.text = this.textArea.value;
            }

            localStorage.setItem('ephemeral_data', JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save data:', error);
            this.showError('Failed to save your work. Please check your browser storage settings.');
        }
    }

    saveCanvasData() {
        try {
            const data = {
                mode: 'scribble',
                duration: this.getCurrentDuration(),
                theme: this.body.classList.contains('dark') ? 'dark' : 'light',
                color: this.currentColor,
                timestamp: Date.now(),
                imageData: this.canvas.toDataURL()
            };

            localStorage.setItem('ephemeral_data', JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save canvas data:', error);
            this.showError('Failed to save your drawing. Please check your browser storage settings.');
        }
    }

    loadData() {
        try {
            const saved = localStorage.getItem('ephemeral_data');
            if (!saved) return;

            const data = JSON.parse(saved);

            // Restore settings
            this.currentMode = data.mode || 'text';
            this.currentColor = data.color || '#000000';

            // Restore theme
            if (data.theme === 'dark') {
                this.body.classList.remove('light');
                this.body.classList.add('dark');
                this.themeToggle.textContent = '☀️ Light';
            }

            // Restore duration
            if ([1, 6, 12, 24, 48, 168].includes(data.duration)) {
                this.durationSelect.value = data.duration.toString();
            } else {
                this.durationSelect.value = 'custom';
                this.customHoursInput.value = data.duration;
                this.customHoursInput.style.display = 'inline-block';
            }

            // Load content based on mode
            if (data.mode === 'text' && data.text) {
                this.textArea.value = data.text;
            } else if (data.mode === 'scribble' && data.imageData) {
                this.loadCanvasData(data.imageData);
            }

            // Apply color
            this.textArea.style.color = this.currentColor;
            this.ctx.strokeStyle = this.currentColor;

            // Calculate and apply fade
            this.updateFade(data.timestamp, data.duration);
        } catch (error) {
            console.error('Failed to load data:', error);
            this.showError('Failed to load saved data. Starting with a clean slate.');
            localStorage.removeItem('ephemeral_data');
        }
    }

    loadCanvasData(imageData) {
        if (!imageData) return;

        const img = new Image();
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            // Initialize history with the loaded state
            this.saveCanvasState();
        };
        img.src = imageData;
    }

    // Fade functionality
    startFadeTimer() {
        this.fadeInterval = setInterval(() => {
            try {
                const saved = localStorage.getItem('ephemeral_data');
                if (!saved) {
                    this.timerDisplay.style.display = 'none';
                    return;
                }

                const data = JSON.parse(saved);
                this.updateFade(data.timestamp, data.duration);
                this.updateCountdown(data.timestamp, data.duration);
            } catch (error) {
                console.error('Error in fade timer:', error);
                this.timerDisplay.style.display = 'none';
            }
        }, 1000); // Update every second
    }

    updateFade(timestamp, duration) {
        const elapsed = Date.now() - timestamp;
        const durationMs = duration * 60 * 60 * 1000; // Convert hours to milliseconds
        const progress = Math.min(elapsed / durationMs, 1);

        const opacity = 1 - progress;

        if (this.currentMode === 'text') {
            this.textContainer.style.opacity = opacity;
        } else {
            this.canvasContainer.style.opacity = opacity;
        }

        // Show fade notice when content starts fading
        if (progress > 0.1 && opacity > 0.1) {
            this.fadeNotice.classList.add('visible');
            setTimeout(() => this.fadeNotice.classList.remove('visible'), 3000);
        }

        // Clear content when fully faded
        if (opacity <= 0.01) {
            this.clearContent();
        }
    }

    updateCountdown(timestamp, duration) {
        const elapsed = Date.now() - timestamp;
        const durationMs = duration * 60 * 60 * 1000;
        const remaining = Math.max(0, durationMs - elapsed);

        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        this.countdownTimer.textContent = timeString;
        this.timerDisplay.style.display = remaining > 0 ? 'block' : 'none';

        // Show space facts for preset timers only
        if (this.isPresetTimer(duration) && remaining > 0) {
            this.checkAndShowSpaceFact(timestamp, duration, elapsed);
        }
    }

    clearContent() {
        if (this.currentMode === 'text') {
            this.textArea.value = '';
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        localStorage.removeItem('ephemeral_data');
    }

    // UI updates
    updateUI() {
        // Update mode toggle button text
        this.modeToggle.textContent = this.currentMode === 'text' ? '📝 Text' : '🎨 Draw';

        const drawingTools = document.getElementById('drawingTools');
        const drawingTools2 = document.getElementById('drawingTools2');
        const brushControls = document.getElementById('brushControls');
        const exportControls = document.getElementById('exportControls');

        if (this.currentMode === 'text') {
            this.textContainer.style.display = 'block';
            this.canvasContainer.style.display = 'none';
            drawingTools.style.display = 'none';
            drawingTools2.style.display = 'none';
            brushControls.style.display = 'none';
            exportControls.style.display = 'block';
        } else {
            this.textContainer.style.display = 'none';
            this.canvasContainer.style.display = 'block';
            drawingTools.style.display = 'block';
            drawingTools2.style.display = 'block';
            brushControls.style.display = 'block';
            exportControls.style.display = 'block';
        }
    }

    // Keyboard navigation
    handleKeyboard(e) {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            return;
        }

        switch (e.key.toLowerCase()) {
            case 't':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.switchMode('text');
                }
                break;
            case 'd':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.switchMode('scribble');
                }
                break;
            case 's':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.exportContent();
                }
                break;
            case 'z':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                }
                break;
            case 'y':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.redo();
                }
                break;
            case 'escape':
                // Clear focus from any focused element
                document.activeElement.blur();
                break;
            case 't':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.toggleFloatingToolbar();
                }
                break;
        }
    }

    // Performance optimizations
    optimizeCanvas() {
        // Enable image smoothing for better quality
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        // Use hardware acceleration hints
        this.canvas.style.transform = 'translateZ(0)';

        // Throttle save operations
        this.throttleSave = this.throttle(() => this.saveCanvasData(), 100);
    }

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();

            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    debounce(fn, delay = 300) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Memory management
    cleanupMemory() {
        // Clear old canvas history if too large
        if (this.canvasHistory.length > this.maxHistory) {
            this.canvasHistory = this.canvasHistory.slice(-this.maxHistory);
        }

        // Force garbage collection hint (if available)
        if (window.gc) {
            window.gc();
        }
    }

    // Error handling
    showError(message) {
        // Create a temporary error notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1001;
            max-width: 300px;
            role: alert;
            aria-live: assertive;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    // Welcome modal functionality
    checkAndShowWelcomeModal() {
        try {
            const hasSeenWelcome = localStorage.getItem('welcome_modal_shown');
            if (!hasSeenWelcome) {
                this.showWelcomeModal();
            }
        } catch (error) {
            console.error('Failed to check welcome modal status:', error);
            // If localStorage fails, show the modal anyway to ensure users see it
            this.showWelcomeModal();
        }
    }

    showWelcomeModal() {
        const modal = document.getElementById('welcomeModal');
        if (!modal) return;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Focus management
        const getStartedBtn = document.getElementById('getStartedBtn');
        if (getStartedBtn) {
            getStartedBtn.focus();
        }

        // Setup event listeners
        this.setupWelcomeModalListeners();
    }

    hideWelcomeModal() {
        const modal = document.getElementById('welcomeModal');
        if (!modal) return;

        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling

        // Check if user wants to hide permanently
        const dontShowAgain = document.getElementById('dontShowAgain');
        if (dontShowAgain && dontShowAgain.checked) {
            try {
                localStorage.setItem('welcome_modal_shown', 'true');
            } catch (error) {
                console.error('Failed to save welcome modal preference:', error);
            }
        }
    }

    setupWelcomeModalListeners() {
        const getStartedBtn = document.getElementById('getStartedBtn');
        const modal = document.getElementById('welcomeModal');

        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => this.hideWelcomeModal());
        }

        // Close on backdrop click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideWelcomeModal();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.hideWelcomeModal();
            }
        });
    }

    // Brush preview helpers
    showBrushPreview() {
        const preview = document.getElementById('brushPreview');
        if (!preview || this.currentMode !== 'scribble') return;
        preview.classList.add('visible');
        preview.setAttribute('aria-hidden', 'false');
    }

    hideBrushPreview() {
        const preview = document.getElementById('brushPreview');
        if (!preview) return;
        preview.classList.remove('visible');
        preview.setAttribute('aria-hidden', 'true');
    }

    updateBrushPreview(e) {
        const preview = document.getElementById('brushPreview');
        if (!preview || this.currentMode !== 'scribble') return;

        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const pxX = clientX - rect.left;
        const pxY = clientY - rect.top;

        const size = this.currentTool === 'eraser' ? Math.max(this.brushSize * 2, 8) : this.brushSize;
        preview.style.width = `${size}px`;
        preview.style.height = `${size}px`;
        preview.style.left = `${pxX}px`;
        preview.style.top = `${pxY}px`;

        if (this.currentTool === 'eraser') {
            preview.style.background = 'rgba(255,255,255,0.25)';
            preview.style.borderColor = 'rgba(0,0,0,0.35)';
        } else {
            const bg = this.hexToRgba(this.currentColor, 0.20);
            const border = this.hexToRgba(this.currentColor, 0.55);
            preview.style.background = bg;
            preview.style.borderColor = border;
        }

        this.showBrushPreview();
    }
}

EphemeralPad.prototype.hexToRgba = function(hex, alpha = 1) {
    try {
        let h = hex.startsWith('#') ? hex.slice(1) : hex;
        if (h.length === 3) {
            const r = parseInt(h[0] + h[0], 16);
            const g = parseInt(h[1] + h[1], 16);
            const b = parseInt(h[2] + h[2], 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else if (h.length === 6) {
            const r = parseInt(h.slice(0, 2), 16);
            const g = parseInt(h.slice(2, 4), 16);
            const b = parseInt(h.slice(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
    } catch (e) {
        console.warn('hexToRgba parse failed, falling back to black', hex, e);
    }
    return `rgba(0,0,0,${alpha})`;
};

// Initialize the application when DOM is loaded
EphemeralPad.prototype.debounce = function(fn, delay = 300) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), delay);
    };
};

 document.addEventListener('DOMContentLoaded', () => {
     new EphemeralPad();
 });
