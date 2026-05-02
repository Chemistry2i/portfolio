/**
 * "Available for hire" pulsing badge with response time.
 * Used in Hero and can be reused in Contact.
 */
const AvailabilityBadge = ({ compact = false }: { compact?: boolean }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 glass-card rounded-full border border-green-400/30 ${
        compact ? 'px-3 py-1' : 'px-4 py-2'
      }`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
      </span>
      <span className={`font-medium text-foreground ${compact ? 'text-xs' : 'text-xs sm:text-sm'}`}>
        Available for hire
      </span>
      {!compact && (
        <>
          <span className="hidden sm:inline text-muted-foreground/60">•</span>
          <span className="hidden sm:inline text-xs text-muted-foreground">
            Replies within 24h
          </span>
        </>
      )}
    </div>
  );
};

export default AvailabilityBadge;
