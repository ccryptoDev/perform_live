import { useCallback } from 'react';
import { firebaseClient } from '../../../../utils/firebase';

export default function useReactionAction() {
  const onReacted = useCallback(() => {
    firebaseClient._emitter.emit(`local_reactions_added`, {
      timestamp: Date.now() + Math.random(),
    });
  }, []);

  return {
    onReacted,
  };
}
