import { TopicType } from '@/api/topics'
import { OutlineButton } from '@/components/common/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowDroprightCircle } from "react-icons/io";
type TopicsListProps = {
    topics:TopicType[]
}
interface AddNewTopicProps{
    topicsList:TopicType[];
    setTopicsList:any;
    setIsAddingNewTopic:any;
}
export const TopicsList = ({topics}:TopicsListProps) => {
    const [topicsList, setTopicsList] = useState<TopicType[]>(topics)
    const [isAddingNewTopic, setIsAddingNewTopic] = useState(false)
    const firstTopics = topicsList.slice(0, 6);
    
    return (
    <>
        <ul className='mb-2 divide-y'>
            {firstTopics.map((singleTopic:TopicType, i:number) => (
                <li className={`py-4 `} key={i}>
                    <Link to={singleTopic.url}>{singleTopic.name}</Link>
                </li>
            ))}
        </ul>

        {topicsList.length>6 &&
            <span className='mb-12'>Ver os tópicos</span>
        }

        {isAddingNewTopic && <AddNewTopicInput topicsList={topicsList} setTopicsList={setTopicsList} setIsAddingNewTopic={setIsAddingNewTopic} />}

        {!isAddingNewTopic &&
            <OutlineButton onClick={() => setIsAddingNewTopic(true)}>+ Adicionar tópico</OutlineButton>
        }
    </>
    )
}

const AddNewTopicInput = ({topicsList, setTopicsList, setIsAddingNewTopic}:AddNewTopicProps) => {
    const [topicName, setTopicName] = useState<string>('')
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
            name: cleanedTopicName,
            url: topicUrl
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
            />
            <IoIosArrowDroprightCircle onClick={() => handleNewTopic(topicName)} className='text-2xl cursor-pointer'/>
        </div>
        <div className='flex absolute'>
            <span className='font-bold -mt-8 -mr-1 z-50 cursor-pointer text-xl' onClick={() => setIsAddingNewTopic(false)}>x</span>
        </div>
       

    </div>
    )
}
