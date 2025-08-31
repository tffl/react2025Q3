import type { FC } from 'react';
import styles from './ColumnsModal.module.css';

interface ColumnsModal {
  open: boolean;
  onClose: () => void;
  available: string[];
  selected: string[];
  onToggle: (col: string) => void;
}

const ColumnsModal: FC<ColumnsModal> = ({
  open,
  onClose,
  available,
  selected,
  onToggle,
}) => {
  if (!open) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Add additional columns</h3>

        <div className={styles.columnsGrid}>
          {available.map((col) => (
            <label key={col} className={styles.columnLabel}>
              <input
                type="checkbox"
                checked={selected.includes(col)}
                onChange={() => onToggle(col)}
              />
              <span>{col}</span>
            </label>
          ))}
        </div>

        <div className={styles.footer}>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnsModal;
