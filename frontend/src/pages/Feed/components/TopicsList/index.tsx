import { TopicType } from '@/api/topics'
import { OutlineButton } from '@/components/common/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowDroprightCircle } from "react-icons/io";
type TopicsListProps = {
    topics:TopicType[]
}
export const TopicsList = ({topics}:TopicsListProps) => {
    const [topicsList, setTopicsList] = useState<TopicType[]>(topics)
    const [topicName, setTopicName] = useState<string>('')
    const [isAddingNewTopic, setIsAddingNewTopic] = useState(false)
    
    const filterSpaceAndSpecialChars = (value:string, setFunction:any = null) => {
        const removeSpecialCharacters = (str: string) => str.replace(/[^a-zA-Z0-9\s]/g, '');
        const removeDoubleSpaces = (str: string) => str.replace(/\s{2,}/g, ' ');
        const filtredValue = removeDoubleSpaces(removeSpecialCharacters(value))

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
    
    return (
    <>
        <ul className='mb-2 divide-y'>
            {topicsList.map((singleTopic:TopicType, i:number) => (
                <li className={`py-4 `} key={i}>
                    <Link to={singleTopic.url}>
                        {singleTopic.name}
                    </Link>
                </li>
            ))}
        </ul>
        {isAddingNewTopic &&
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
        }
        {!isAddingNewTopic &&
            <OutlineButton onClick={() => setIsAddingNewTopic(true)}>+ Adicionar tópico</OutlineButton>
        }
    </>
)
}
