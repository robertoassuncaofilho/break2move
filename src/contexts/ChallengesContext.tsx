import { createContext, useState, ReactNode, useEffect } from 'react';

import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';
import {nextChallenge} from '../services/challenges.service'

export interface Challenge{
    type:'body' | 'eye';
    description: string;
    points: number;
}

interface ChallengeContextData{
    level:number;
    CurrentExperience:number;
    experienceToNextLevel:number;
    ChallengesCompleted:number;
    activeChallenge:Challenge;
    levelUp:() => void;
    startNewChallenge:() => void;
    resetChallenge:() => void;
    completeChallenge:()=> void;
    closeLevelUpModal: ()=> void;
}


interface ChallengesProviderProps{
    children:ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({
    children,
   ...rest
}:ChallengesProviderProps){
    const [level, setlevel] = useState(rest.level??1);
    const [CurrentExperience, setCurrentExperience] = useState(rest.currentExperience??0);
    const [ChallengesCompleted, SetChallengesCompleted] = useState(rest.currentExperience??0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const [isLevelupModalOpen,SetIsLevelupModalOpen] = useState(false)


    const experienceToNextLevel = Math.pow((level + 1) * 4 ,2)

    useEffect(()=>{
        Notification.requestPermission();
    },[])

    useEffect(()=>{
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(CurrentExperience));
        Cookies.set('challengesCompleted',String(ChallengesCompleted));
    },[level,CurrentExperience,ChallengesCompleted]);

    function levelUp(){
        setlevel(level + 1)
        SetIsLevelupModalOpen(true)
    }
    
    async function startNewChallenge(){

        let response = await nextChallenge()
        setActiveChallenge(await {...response.data})

    }

    useEffect(
        () => {
            
            if(activeChallenge && Notification.permission === 'granted'){
                new Audio('/notification.mp3').play()
                new Notification('Break2Move - New Challenge 🎉',{
                    body:`Go for ${activeChallenge.points} xp`,
                    icon:'favicon.png'
                    
                })
            }          
        }
    , [activeChallenge])

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { points } = activeChallenge;

        let finalExperience = CurrentExperience + points;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp()
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        SetChallengesCompleted(ChallengesCompleted + 1);
    }

    function closeLevelUpModal(){
        SetIsLevelupModalOpen(false);
    }

    return(
        <ChallengesContext.Provider 
        value={
            {
            level,
            CurrentExperience,
            ChallengesCompleted,
            experienceToNextLevel,
            activeChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal
            }
              }>
            {children}
            {isLevelupModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}