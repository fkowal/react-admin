import { Droppable } from '@hello-pangea/dnd';
import { Box, Typography } from '@mui/material';

import { Deal } from '../types';
import { DealCard } from './DealCard';
import { useCRMContext } from '../CRM/CRMContext';

export const DealColumn = ({
    stage,
    deals,
}: {
    stage: string;
    deals: Deal[];
}) => {
    const { dealStages } = useCRMContext();
    return (
        <Box
            sx={{
                flex: 1,
                paddingTop: '8px',
                paddingBottom: '16px',
                bgcolor: '#eaeaee',
                '&:first-child': {
                    paddingLeft: '5px',
                    borderTopLeftRadius: 5,
                },
                '&:last-child': {
                    paddingRight: '5px',
                    borderTopRightRadius: 5,
                },
            }}
        >
            <Typography align="center" variant="subtitle1">
                {/* @ts-ignore */}
                {
                    dealStages?.find(dealStage => dealStage.value === stage)
                        ?.label
                }
            </Typography>
            <Droppable droppableId={stage}>
                {(droppableProvided, snapshot) => (
                    <Box
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                        className={
                            snapshot.isDraggingOver ? ' isDraggingOver' : ''
                        }
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 1,
                            padding: '5px',
                            '&.isDraggingOver': {
                                bgcolor: '#dadadf',
                            },
                        }}
                    >
                        {deals.map((deal, index) => (
                            <DealCard key={deal.id} deal={deal} index={index} />
                        ))}
                        {droppableProvided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Box>
    );
};
