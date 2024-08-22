export const formatTimeAgo = (dateToFormat: string): string => {
    if (dateToFormat.includes(' ')) dateToFormat = dateToFormat.replace(' ', 'T');
    const date:Date = new Date(dateToFormat);
    if (isNaN(date.getTime())) throw new Error('Formato de data inválido');
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if      (diffMinutes < 1)   return 'agora mesmo';
    else if (diffMinutes === 1) return 'há 1 minuto atrás';
    else if (diffMinutes < 60)  return `há ${diffMinutes} minutos atrás`;
    else if (diffHours === 1)   return 'há 1 hora atrás';
    else if (diffHours < 24)    return `há ${diffHours} horas atrás`;
    else if (diffDays === 1)    return 'há 1 dia atrás';
    else return `há ${diffDays} dias atrás`;
};
