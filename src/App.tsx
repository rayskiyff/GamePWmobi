/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  ArrowLeft, 
  Swords, 
  Store, 
  GlassWater, 
  Users, 
  User as UserIcon,
  Crown,
  Trophy,
  ShieldAlert,
  Hammer,
  Plus,
  Lock,
  Monitor,
  LogOut,
  Globe,
  Eye,
  EyeOff
} from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<'welcome' | 'city'>('welcome');
  const [activeTab, setActiveTab] = useState('colosseum');
  const [heroGender, setHeroGender] = useState<'male' | 'female'>('male');
  const [heroRace, setHeroRace] = useState<'human' | 'mage'>('human');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [inventoryTab, setInventoryTab] = useState<'weapons'|'armor'|'jewelry'|'potions'|'misc'>('weapons');
  const [username, setUsername] = useState('Арес');
  const [password, setPassword] = useState('********');

  // Player Data states
  const [realName, setRealName] = useState('Иван Иванов');
  const [showRealName, setShowRealName] = useState(false);
  const [dob, setDob] = useState('01.01.1990');
  const [showDob, setShowDob] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const [hideAllInfo, setHideAllInfo] = useState(false);

  // Derived Characteristics Logic as requested
  const baseStats = {
    strength: 10,
    agility: 10,
    intuition: 10,
    endurance: 10,
    intelligence: 0,
    wisdom: 0
  };

  const heroStats = {
    crit: Math.floor(baseStats.agility * 0.5 + baseStats.intuition * 0.5),
    power: baseStats.strength * 2,
    absorption: baseStats.endurance * 1.5,
    critChance: (baseStats.intuition * 0.2).toFixed(1) + '%',
    attackSpeed: (baseStats.agility * 1.2).toFixed(1)
  };

  const userId = useMemo(() => Math.floor(10000 + Math.random() * 90000), []);


  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const navItems = [
    { id: 'colosseum', label: 'Колизей', icon: Swords },
    { id: 'market', label: 'Рынок', icon: Store },
    { id: 'forge', label: 'Кузница', icon: Hammer },
    { id: 'tavern', label: 'Таверна', icon: GlassWater },
    { id: 'clans', label: 'Кланы', icon: Users },
    { id: 'hero', label: 'Герой', icon: UserIcon },
  ];

  const colosseumModes = [
    { 
      id: 'duel', 
      title: 'Дуэль', 
      desc: '1 на 1 с противником твоего уровня (статы ±4%). На раздумье 10 сек, затем отсчет 5 сек и бой.', 
      icon: UserIcon, 
      bg: '/assets/backgrounds/coliseum/duel/file_0000000063fc7243806e1f45739f6291.png',
      rank: 'Золото III',
      points: 1250,
      btnLabel: 'Подать заявку / Вступить'
    },
    { 
      id: 'group', 
      title: 'Групповые', 
      desc: 'Команды. Подбор уровня (или ±1). Ожидание 2 мин. Бой начинается только при полных составах (4 игрока).', 
      icon: Users, 
      bg: '/assets/backgrounds/coliseum/group/file_00000000c2f07243bb6eaf5e194a6aff.png',
      rank: 'Серебро I',
      points: 840,
      btnLabel: 'Создать поединок'
    },
    { 
      id: 'royale', 
      title: 'Королевская битва', 
      desc: '50 участников. Последний выживший забирает всё. Утешительные призы для Топ-10 выживших.', 
      icon: Crown, 
      bg: '/assets/backgrounds/coliseum/royalbattle/file_000000006bc0724394aea7f293112311.png',
      rank: 'Новичок',
      points: 150,
      btnLabel: 'Войти в очередь'
    },
  ];

  if (screen === 'city') {
    const bgImage = activeTab === 'colosseum' 
      ? '/assets/backgrounds/coliseum/file_00000000aea8720a8d0aec147c7d00a9.png'
      : activeTab === 'market'
        ? '/assets/backgrounds/auth/shop/file_0000000047707243b8ed423e47c92129.png'
      : activeTab === 'forge'
        ? '/assets/backgrounds/forge/file_000000008d2472438c3b2ef79d9b51d8.png'
      : activeTab === 'hero'
        ? '/assets/backgrounds/heroes/file_00000000428c720ab291c90696a2c628.png'
      : activeTab === 'clans'
        ? '/assets/backgrounds/coliseum/file_00000000aea8720a8d0aec147c7d00a9.png'
      : '/assets/backgrounds/coliseum/file_00000000aea8720a8d0aec147c7d00a9.png';

    return (
      <div className="min-h-screen bg-black text-white flex justify-center font-sans">
        <div className="w-full max-w-[500px] h-screen bg-[#0a0a0a] relative overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] border-x border-white/5">
          {/* Background Image for City */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img 
                key={bgImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={bgImage} 
                className="w-full h-full object-cover transform-gpu"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Global Nav - Tactical HUD */}
          <nav className="px-4 pt-4 pb-2 flex justify-between items-center z-40 relative">
             <motion.button 
               onClick={() => setScreen('welcome')}
               whileHover={{ scale: 1.05 }}
               className="group flex items-center gap-2 py-1.5 px-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl transition-all hover:bg-white/10 relative z-10 transform-gpu"
             >
               <ArrowLeft className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
               <span className="text-[9px] uppercase font-black tracking-[0.2em] text-zinc-500 group-hover:text-white">Назад</span>
             </motion.button>
             
             {activeTab !== 'hero' && (
               <div className="flex flex-col items-end gap-1 relative z-10">
                 <div className="flex items-center bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-xl gap-2 transform-gpu">
                   <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-1 rounded-full bg-game-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                   <span className="text-[9px] uppercase font-black tracking-widest text-white/90">Уровень 1</span>
                 </div>
               </div>
             )}
          </nav>

          {/* Main City View */}
          <main className="flex-1 flex flex-col px-6 z-10 pb-32 overflow-y-auto overflow-x-hidden scrollbar-hide">
            <AnimatePresence mode="wait">
            {activeTab === 'colosseum' && (
              <motion.div
                key="colosseum"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-10 py-6"
              >
                <div className="text-center space-y-1">
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-white via-game-blue to-white/50 bg-clip-text text-transparent">Колизей</h2>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.6em] font-bold">Арена славы и крови</p>
                </div>

                <div className="grid gap-5 max-w-md mx-auto w-full group/list">
                  {colosseumModes.map((mode, i) => (
                    <motion.div
                      key={mode.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12, ease: "easeOut" }}
                      className="relative overflow-hidden p-6 rounded-[2.5rem] border border-white/5 flex flex-col gap-4 group text-left transition-all duration-300 bg-white/5 backdrop-blur-md hover:border-white/20 transform-gpu"
                    >
                      {/* Card Background Image with enhanced parallax-like feel */}
                      <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        <img 
                          src={mode.bg} 
                          className="w-full h-full object-cover opacity-[0.15] group-hover:opacity-30 group-hover:scale-125 transition-all duration-1000 ease-out" 
                          alt="" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      </div>

                      <div className="relative z-10 flexitems-start gap-4 flex w-full">
                        <div className="p-4 rounded-2xl bg-white/5 text-white backdrop-blur-md border border-white/10 group-hover:bg-game-blue/20 group-hover:border-game-blue/40 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                          <mode.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-1 group-hover:text-game-blue transition-colors">{mode.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20">Очки: {mode.points}</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">{mode.rank}</span>
                          </div>
                          <p className="text-[10px] text-white/50 tracking-wider font-bold leading-relaxed">{mode.desc}</p>
                        </div>
                      </div>

                      <div className="relative z-10 mt-2">
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all rounded-xl text-[10px] uppercase font-black tracking-[0.2em] text-white">
                          {mode.btnLabel}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'market' && (
              <motion.div
                key="market"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-10 py-6 h-full"
              >
                <div className="text-center space-y-1">
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-white via-game-amber to-white/50 bg-clip-text text-transparent">Рынок</h2>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.6em] font-bold">Торговые ряды и сокровища</p>
                </div>
                
                <div className="grid grid-cols-2 gap-5 max-w-md mx-auto w-full">
                  {[
                    { name: 'Меч Огня', price: 500, quality: 'epic' },
                    { name: 'Щит Стали', price: 300, quality: 'rare' },
                    { name: 'Зелье Силы', price: 50, quality: 'common' },
                    { name: 'Шлем Грифона', price: 1200, quality: 'legendary' }
                  ].map((item, i) => (
                    <motion.div 
                      key={item.name}

                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, ease: "easeOut" }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-5 flex flex-col items-center gap-5 group cursor-pointer transition-all hover:bg-white/10 hover:border-game-amber/30"
                    >
                      <div className="w-full aspect-square bg-black/40 rounded-[2rem] flex items-center justify-center p-6 border border-white/5 relative overflow-hidden">
                        <div className={`absolute inset-0 opacity-10 blur-2xl ${
                           item.quality === 'epic' ? 'bg-purple-500' :
                           item.quality === 'legendary' ? 'bg-amber-500' :
                           item.quality === 'rare' ? 'bg-blue-500' : 'bg-white'
                        }`} />
                        <Store className={`w-12 h-12 relative z-10 transition-transform group-hover:scale-110 duration-500 ${
                          item.quality === 'epic' ? 'text-purple-400' :
                          item.quality === 'legendary' ? 'text-game-amber' :
                          item.quality === 'rare' ? 'text-blue-400' : 'text-zinc-400'
                        }`} />
                      </div>
                      <div className="text-center">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">{item.name}</h4>
                        <div className="flex items-center justify-center gap-1.5 bg-black/40 py-1.5 px-4 rounded-full border border-white/5">
                           <span className="text-[11px] font-mono font-bold text-game-amber">{item.price}</span>
                           <span className="text-[8px] text-game-amber opacity-60">⭐</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'forge' && (
              <motion.div
                key="forge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-10 py-6 h-full"
              >
                <div className="text-center space-y-1">
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-white via-red-500 to-white/50 bg-clip-text text-transparent">Кузница</h2>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.6em] font-bold">Огонь, сталь и мастерство</p>
                </div>

                <div className="grid gap-4 max-w-md mx-auto w-full">
                  {[
                    { name: 'Улучшить оружие', desc: 'Повысьте урон вашего клинка', cost: '1000 ⭐', icon: Swords },
                    { name: 'Закалить броню', desc: 'Увеличьте прочность защиты', cost: '800 ⭐', icon: ShieldAlert },
                    { name: 'Вставить руну', desc: 'Добавьте магические свойства', cost: '1500 ⭐', icon: Hammer },
                  ].map((service, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, ease: "easeOut" }}
                      whileHover={{ scale: 1.02, x: 8 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] flex items-center justify-between group transition-all hover:bg-white/10 hover:border-red-500/30"
                    >
                      <div className="flex items-center gap-5">
                        <div className="p-3.5 bg-red-500/10 rounded-2xl border border-red-500/20 group-hover:bg-red-500/20 transition-all">
                           <service.icon className="w-5 h-5 text-red-500" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90 mb-1">{service.name}</h4>
                          <p className="text-[9px] text-white/40 font-bold tracking-wide">{service.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 py-1.5 px-4 rounded-full border border-white/5">
                        <span className="text-[10px] font-mono font-bold text-red-400 group-hover:text-red-500 transition-colors uppercase">
                          {service.cost.split(' ')[0]}
                        </span>
                        <span className="text-[8px] text-red-400 opacity-60">⭐</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'hero' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full overflow-y-auto scrollbar-hide pb-32"
              >
                {/* Character Preview Area - Centered at top */}
                <div className="relative flex-shrink-0 flex items-start justify-center pt-4 mb-4">
                  <div className="relative w-[200px] h-[450px] z-0">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={heroGender}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        src={heroGender === 'male' 
                          ? "/assets/characters/player/avatar/male/file_000000000c647243ae3401e52f45d8d3.png" 
                          : "/assets/characters/player/avatar/female/file_00000000227c7243a365b2b04eae6eea.png"}
                        className="w-full h-full object-cover mix-blend-screen"
                        alt="Hero"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Gender Selector */}
                  <div className="absolute top-10 right-4 flex flex-col gap-4 z-30">
                    <button 
                      onClick={() => setHeroGender('male')}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${heroGender === 'male' ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 opacity-40'}`}
                    >
                      <UserIcon className="w-5 h-5 text-blue-400" />
                    </button>
                    <button 
                      onClick={() => setHeroGender('female')}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${heroGender === 'female' ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-white/5 border-white/10 opacity-40'}`}
                    >
                      <UserIcon className="w-5 h-5 text-purple-400" />
                    </button>
                  </div>
                </div>

                {/* Info blocks - Redesigned as requested */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="px-4 space-y-4 pb-24"
                >
                  {/* Character Name & Level Summary */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2.5rem] flex justify-between items-center px-6">
                    <div>
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent leading-none">
                        {username}
                      </h2>
                      <div className="flex gap-2 mt-1">
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">Уровень 1</p>
                        <span className="text-[10px] text-game-emerald/60 uppercase tracking-[0.2em] font-black">• {heroRace === 'human' ? 'Человек' : 'Маг'}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Crown className="w-6 h-6 text-amber-500" />
                    </div>
                  </div>

                  {/* 1. Base Characteristics Block */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2.5rem] space-y-5">
                    <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-white/40 mb-2 pl-1">Характеристики</h3>
                    <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                      {[
                        { label: 'Сила', val: baseStats.strength, color: 'text-red-400' },
                        { label: 'Ловкость', val: baseStats.agility, color: 'text-emerald-400' },
                        { label: 'Интуиция', val: baseStats.intuition, color: 'text-purple-400' },
                        { label: 'Выносливость', val: baseStats.endurance, color: 'text-orange-400' },
                        { label: 'Интеллект', val: baseStats.intelligence, color: 'text-blue-400' },
                        { label: 'Мудрость', val: baseStats.wisdom, color: 'text-teal-400' },
                      ].map((stat, i) => (
                        <div key={stat.label} className="flex flex-col">
                          <p className="text-[8px] uppercase tracking-widest text-white/20 mb-1">{stat.label}</p>
                          <div className="flex items-end gap-1.5">
                            <span className="text-2xl font-black italic tabular-nums leading-none text-white">{stat.val}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Hero Statistics Block (Derived from characteristics/equip) */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2.5rem] space-y-5">
                    <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-white/40 mb-2 pl-1">Статистика героя</h3>
                    <p className="text-[8px] text-white/30 uppercase tracking-widest mb-4">Меняется от характеристик и экипировки</p>
                    <div className="grid grid-cols-2 gap-y-5 gap-x-6">
                      {[
                        { label: 'Крит', val: heroStats.crit },
                        { label: 'Сила атаки', val: heroStats.power },
                        { label: 'Поглощение', val: heroStats.absorption },
                        { label: 'Шанс крита', val: heroStats.critChance },
                        { label: 'Скор. атаки', val: heroStats.attackSpeed },
                      ].map((stat, i) => (
                        <div key={stat.label} className="flex flex-col border-b border-white/5 pb-2">
                          <p className="text-[7px] uppercase tracking-widest text-white/30 mb-1 whitespace-nowrap">{stat.label}</p>
                          <p className="text-lg font-black italic text-game-blue">{stat.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Player Data Block */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2.5rem] space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-white/40 pl-1">Данные игрока</h3>
                      <button 
                        onClick={() => setHideAllInfo(!hideAllInfo)}
                        className={`p-2 rounded-xl border ${hideAllInfo ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-white/50'} transition-all`}
                        title={hideAllInfo ? 'Показать всем' : 'Скрыть от всех'}
                      >
                        {hideAllInfo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Name Row */}
                      <div className="flex gap-2 items-center bg-black/20 p-3 rounded-2xl border border-white/5">
                        <UserIcon className="w-4 h-4 text-white/20" />
                        <input 
                          type="text" 
                          value={realName}
                          onChange={(e) => setRealName(e.target.value)}
                          placeholder="Реальное имя"
                          className="bg-transparent border-none p-0 focus:ring-0 text-xs font-bold text-white w-full outline-hidden"
                        />
                        <button onClick={() => setShowRealName(!showRealName)} className="text-white/30 hover:text-white transition-colors p-1">
                          {showRealName ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* DOB Row */}
                      <div className="flex gap-2 items-center bg-black/20 p-3 rounded-2xl border border-white/5">
                        <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold ml-1">Дата Рожд.</span>
                        <input 
                          type="text" 
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="bg-transparent border-none p-0 focus:ring-0 text-xs font-bold text-white w-full outline-hidden text-right"
                        />
                        <button onClick={() => setShowDob(!showDob)} className="text-white/30 hover:text-white transition-colors p-1">
                          {showDob ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* About me */}
                      <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
                        <textarea
                          value={aboutMe}
                          onChange={(e) => setAboutMe(e.target.value)}
                          placeholder="О себе:"
                          className="bg-transparent border-none p-0 focus:ring-0 text-xs text-white/50 w-full outline-hidden min-h-[40px] resize-none"
                        />
                      </div>

                      {/* Static Info */}
                      <div className="space-y-2 pt-2 border-t border-white/5 text-[9px] uppercase tracking-widest text-white/40">
                        <p>Дата регистрации: <span className="text-white">22.04.2026</span></p>
                        <p>1 ур. Об. КО <span className="text-game-blue">(0/100)</span></p>
                        <p>Достижения: <span className="text-white/20">нету</span></p>
                        <p>Ранг Колизея: <span className="text-white/20">нету</span></p>
                        <p>Сыграно боёв: <span className="text-white">0</span> | п. <span className="text-emerald-400">0</span> | п. <span className="text-red-400">0</span></p>
                        <p>Часов проведенных в походе: <span className="text-white">0:00</span></p>
                      </div>
                    </div>
                  </div>

                  {/* 4. Inventory Button */}
                  <motion.button
                    onClick={() => setIsInventoryOpen(true)}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 h-20 rounded-[2rem] flex items-center justify-between px-8 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                        <Store className="w-6 h-6 text-amber-500" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-[0.2em] italic">Инвентарь</span>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-white/20 rotate-180 group-hover:text-white transition-all group-hover:translate-x-1" />
                  </motion.button>

                  {/* 4. Settings Button */}
                  <motion.button
                    onClick={() => setIsSettingsOpen(true)}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 h-20 rounded-[2rem] flex items-center justify-between px-8 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                        <ShieldAlert className="w-6 h-6 text-white/40 group-hover:text-white" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-[0.2em] italic">Настройки</span>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-white/20 rotate-180 group-hover:text-white transition-all group-hover:translate-x-1" />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'clans' && (
              <motion.div
                key="clans"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-10 py-6 h-full"
              >
                <div className="text-center space-y-1">
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-white via-game-emerald to-white/50 bg-clip-text text-transparent">Кланы</h2>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.6em] font-bold">Сила в единстве</p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto w-full px-2">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center gap-2 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] group transition-all hover:bg-game-emerald/10 hover:border-game-emerald/30"
                  >
                    <div className="p-3 bg-game-emerald/10 rounded-2xl group-hover:bg-game-emerald/20 transition-colors">
                      <Plus className="w-5 h-5 text-game-emerald" />
                    </div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-white/60 group-hover:text-white">Создать</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center gap-2 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] group transition-all hover:bg-white/10"
                  >
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                      <Users className="w-5 h-5 text-white/40 group-hover:text-white" />
                    </div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-white/40 group-hover:text-white">Вступить</span>
                  </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 px-2 pt-2 scrollbar-hide pb-20">
                  <div className="flex justify-between items-center px-2 mb-2">
                    <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/20">Топ кланов мира</p>
                    <div className="h-px flex-1 bg-white/5 ml-4" />
                  </div>
                  {[
                    { name: 'Legion Alpha', members: 45, level: 12, rank: 1 },
                    { name: 'Light Order', members: 50, level: 15, rank: 2 },
                    { name: 'Dark Brotherhood', members: 38, level: 10, rank: 3 },
                    { name: 'Shadow Ninjas', members: 22, level: 5, rank: 4 },
                  ].map((clan, i) => (
                    <motion.div 
                      key={clan.name} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      className="bg-white/5 backdrop-blur-xl border border-white/5 p-5 rounded-[2rem] flex items-center gap-5 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 bg-black/40 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-game-emerald/30 transition-colors">
                        <Building2 className="w-6 h-6 text-white/10 group-hover:text-game-emerald transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-black uppercase tracking-widest leading-none mb-1.5">{clan.name}</h4>
                        <div className="flex gap-4">
                           <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold">{clan.members}/50 уч.</span>
                           <span className="text-[9px] uppercase tracking-widest text-game-emerald/60 font-bold">Уровень {clan.level}</span>
                        </div>
                      </div>
                      <div className="p-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <Trophy className="w-5 h-5 text-game-emerald" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'tavern' && (
              <motion.div
                key="tavern"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center justify-center p-12"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-12 rounded-[2.5rem] text-center w-full">
                  <GlassWater className="w-12 h-12 text-white/10 mx-auto mb-6" />
                  <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-black">Раздел в разработке</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Settings Overlay */}
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Настройки</h2>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide pb-20">
                {/* Account Settings */}
                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-black tracking-widest text-white/30 pl-2">Аккаунт</p>
                  <div className="grid gap-3">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
                      <label className="text-[8px] uppercase font-bold text-white/40">Имя пользователя</label>
                      <div className="flex items-center gap-3">
                        <UserIcon className="w-4 h-4 text-game-blue" />
                        <input 
                          type="text" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)}
                          className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-white w-full outline-hidden"
                        />
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
                      <label className="text-[8px] uppercase font-bold text-white/40">Пароль</label>
                      <div className="flex items-center gap-3">
                        <Lock className="w-4 h-4 text-game-blue" />
                        <input 
                          type="password" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-white w-full outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Character Settings */}
                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-black tracking-widest text-white/30 pl-2">Персонаж</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3">
                      <p className="text-[8px] uppercase font-bold text-white/40">Пол</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setHeroGender('male')}
                          className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${heroGender === 'male' ? 'bg-game-blue text-white' : 'bg-white/5 text-white/40'}`}
                        >
                          Муж
                        </button>
                        <button 
                          onClick={() => setHeroGender('female')}
                          className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${heroGender === 'female' ? 'bg-game-blue text-white' : 'bg-white/5 text-white/40'}`}
                        >
                          Жен
                        </button>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3">
                      <p className="text-[8px] uppercase font-bold text-white/40">Раса</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setHeroRace('human')}
                          className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${heroRace === 'human' ? 'bg-game-emerald text-white' : 'bg-white/5 text-white/40'}`}
                        >
                          Чел
                        </button>
                        <button 
                          onClick={() => setHeroRace('mage')}
                          className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${heroRace === 'mage' ? 'bg-game-emerald text-white' : 'bg-white/5 text-white/40'}`}
                        >
                          Маг
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Settings */}
                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-black tracking-widest text-white/30 pl-2">Система</p>
                  <div className="grid gap-3">
                    <button 
                      onClick={toggleFullScreen}
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Monitor className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80 group-hover:text-white">На весь экран</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        setIsSettingsOpen(false);
                        setScreen('welcome');
                      }}
                      className="w-full bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-center justify-between group hover:bg-red-500/20 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <LogOut className="w-5 h-5 text-red-500/60 group-hover:text-red-500 transition-colors" />
                        <span className="text-xs font-bold uppercase tracking-widest text-red-500/80 group-hover:text-red-500">Выход из аккаунта</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* UserID at bottom */}
              <div className="pt-6 border-t border-white/5 text-center">
                <p className="text-[10px] uppercase font-black tracking-[0.5em] text-white/10">UserID: {userId}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inventory Overlay */}
        <AnimatePresence>
          {isInventoryOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-amber-500">Инвентарь</h2>
                <button 
                  onClick={() => setIsInventoryOpen(false)}
                  className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-2">
                {[
                  { id: 'weapons', label: '1. Оружие' },
                  { id: 'armor', label: '2. Доспехи' },
                  { id: 'jewelry', label: '3. Украшения' },
                  { id: 'potions', label: '4. Зелья и Эликсиры' },
                  { id: 'misc', label: '5. Руны, Книги и т.д.' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setInventoryTab(tab.id as any)}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                      inventoryTab === tab.id 
                        ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-white/5 border border-white/5 text-white/30 hover:text-white/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white/5 rounded-[2.5rem] border border-white/5 border-dashed">
                  <Store className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black mb-2">Пусто</p>
                  <p className="text-[8px] uppercase tracking-[0.1em] text-white/20">В этом разделе пока ничего нет</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent Bottom Nav - HUD Interface */}
        <div className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-6 pb-4 cursor-pointer pointer-events-none">
          <motion.nav 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="w-full max-w-[400px] bg-[#080a12]/[0.72] backdrop-blur-[14px] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.35)] rounded-2xl p-1 flex justify-between items-center transform-gpu pointer-events-auto"
          >
            {[
              { id: 'colosseum', icon: Swords, label: 'Арена' },
              { id: 'market', icon: Store, label: 'Рынок' },
              { id: 'forge', icon: Hammer, label: 'Кузня' },
              { id: 'clans', icon: Users, label: 'Кланы' },
              { id: 'hero', icon: UserIcon, label: 'Герой' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className="relative flex-1 group"
              >
                <div className={`flex flex-col items-center gap-1 py-1.5 transition-all duration-500 relative z-10 ${
                  activeTab === item.id ? 'text-game-blue' : 'text-white/20 hover:text-white/40'
                }`}>
                  <item.icon className={`w-4 h-4 transition-all duration-500 ${
                    activeTab === item.id ? 'scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'group-hover:scale-110'
                  }`} />
                  <span className={`text-[6px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                    activeTab === item.id ? 'opacity-100' : 'opacity-0 scale-75'
                  }`}>
                    {item.label}
                  </span>
                  
                  {activeTab === item.id && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white/5 rounded-xl -z-10 border border-white/10 transform-gpu"
                      transition={{ type: "tween", duration: 0.3 }}
                    />
                  )}
                  {activeTab === item.id && (
                    <motion.div 
                      layoutId="activeTabMarker"
                      className="absolute -bottom-0.5 w-0.5 h-0.5 bg-game-blue rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </div>
              </button>
            ))}
          </motion.nav>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex justify-center font-sans">
      <div className="w-full max-w-[500px] h-screen relative overflow-hidden flex flex-col items-center justify-between p-8">
        {/* Immersive Background */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/assets/backgrounds/auth/file_000000003978720ab49ff435c7d911ad.png" 
            alt="Auth Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
          {/* Subtle Scanning Lines Effect */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center flex-1 gap-4 relative z-10 w-full"
        >
          <div className="text-center group flex flex-col items-center">
            {/* Logo Implementation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mb-6 relative"
            >
              <img 
                src="/assets/backgrounds/auth/logo/file_0000000033b47246b358841b2351f887.png" 
                alt="Paradise World Logo" 
                className="w-[216px] h-auto drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full -z-10"
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="w-full relative z-10 pb-16 flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium mb-8">
              Путешествие начинается в самом сердце Вечности
            </p>
            
            <motion.button
              onClick={() => setScreen('city')}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="relative px-12 py-5 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-2xl text-[11px] font-black tracking-[0.3em] uppercase overflow-hidden group transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">Войти в мир</span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-game-blue rounded-tr-md" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-game-blue rounded-bl-md" />
            </motion.button>
          </motion.div>

          <div className="flex gap-2 opacity-20">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="w-1.5 h-1.5 bg-white rounded-full" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
