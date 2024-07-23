import { TopicType } from '@/api/topics'
import { OutlineButton } from '@/components/common/Button'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Popup } from '@/components/common/Popup';
type TopicsListProps = {
    topics:TopicType[]
}
interface AddNewTopicProps{
    topicsList:TopicType[];
    setTopicsList:any;
    setIsAddingNewTopic:any;
}
export const TopicsList = ({topics}:TopicsListProps) => {
    if(topics.length === 0) return 'Nenhum tópico adicionado';

    const [topicsList, setTopicsList] = useState<TopicType[]>(topics)
    const [isAddingNewTopic, setIsAddingNewTopic] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const firstTopics = topicsList.slice(0, 6);
    
    return (
    <div className='flex flex-col gap-2'>
        <ul className='divide-y'>
            {firstTopics.map((singleTopic:TopicType, i:number) => (
                <li className={`py-4 `} key={i}>
                    <Link to={'/topicos/'+singleTopic.topicUrl}>{singleTopic.topicName}</Link>
                </li>
            ))}
        </ul>

        {topicsList.length>6 &&
            <span className='mb-4 cursor-pointer' onClick={() => setIsPopupOpen(true)} >Ver todos os tópicos</span>
        }

        {isAddingNewTopic && <AddNewTopicInput topicsList={topicsList} setTopicsList={setTopicsList} setIsAddingNewTopic={setIsAddingNewTopic} />}

        {!isAddingNewTopic &&
            <OutlineButton onClick={() => setIsAddingNewTopic(true)}>+ Adicionar tópico</OutlineButton>
        }
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
            <ul className='divide-y'>
                {topicsList.map((singleTopic:TopicType, i:number) => (
                    <li className={`py-4 `} key={i}>
                        <Link to={'/topicos/'+singleTopic.topicUrl}>{singleTopic.topicName}</Link>
                    </li>
                ))}
            </ul>
        </Popup>

        
    </div>
    )
}

const AddNewTopicInput = ({topicsList, setTopicsList, setIsAddingNewTopic}:AddNewTopicProps) => {
    const [topicName, setTopicName] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const filterSpaceAndSpecialChars = (value:string, setFunction:any = null) => {
        const removeSpecialCharactersExceptAccents = (str: string) => str.replace(/[^a-zA-Z0-9\s\u00C0-\u00FF]/g, '');
        const removeDoubleSpaces = (str: string) => str.replace(/\s{2,}/g, ' ');
        const filtredValue = removeDoubleSpaces(removeSpecialCharactersExceptAccents(value))

        if(setFunction) return setFunction(filtredValue)
        else            return filtredValue
    }

    const handleNewTopic = (topicName: string) => {
        const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const formatTopicUrl = (str: string) => str.toLowerCase().replace(/\s+/g, '-');
        
        const cleanedTopicName = filterSpaceAndSpecialChars((topicName));
        const topicUrl = formatTopicUrl(removeAccents(cleanedTopicName));
    
        const topic: TopicType = {
            topicName: cleanedTopicName,
            topicUrl: topicUrl
        };
    
        setTopicsList([...topicsList, topic]);
        setTopicName('')
        setIsAddingNewTopic(false)
    };
    return(
        <div className='flex mb-4 border border-neutral-400 outline-none rounded-md py-4 justify-end'>
        <div className='flex gap-2 w-full items-center justify-between pr-4'>
            <input 
                placeholder={'Insira o novo tópico '} 
                className='w-12/12 bg-transparent placeholder:to-zinc-100 outline-none px-2 ' 
                value={topicName} 
                onChange={(e) => filterSpaceAndSpecialChars(e.target.value, setTopicName) }
                maxLength={20}
                ref={inputRef}
                onKeyDown={(e) => e.key === 'Enter' && handleNewTopic(topicName)}
            />
            <IoIosArrowDroprightCircle onClick={() => handleNewTopic(topicName)} className='text-2xl cursor-pointer'/>
        </div>
        <div className='flex absolute'>
            <span className='font-bold -mt-8 -mr-1 z-50 cursor-pointer text-xl' onClick={() => setIsAddingNewTopic(false)}>x</span>
        </div>
       

    </div>
    )
}
