import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CurrentUserContext } from '../contexts/UserContext'
import styles from '../styles/components/Profile.module.css'

export function Profile(){
    const { level } = useContext(ChallengesContext)
    const { isLoggedIn, loggedUser} = useContext(CurrentUserContext)
    return(
        isLoggedIn &&
        <div className={styles.profileContainer}>
            <img src={loggedUser.picture} alt="profile-image"/>
            <div>
                <strong>{loggedUser.firstName} {loggedUser.lastName}</strong>
                
                <p>
                    <img src="icons/level.svg" alt="level-icon"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}