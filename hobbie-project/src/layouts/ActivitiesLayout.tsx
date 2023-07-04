interface ActivitiesLayoutProps {
    children: React.ReactNode
}

export default function ActivitiesLayout({children}: ActivitiesLayoutProps){
    return(
        <div className='grid grid-cols-2 gap-4'>
        {children}
        </div>
    )
}